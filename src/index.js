var path = require('path')

var defaultOptions = {
  react: true,
  wdyr: true,
  // vue: false,
  outside: false,
  typescript: true,
  datefns: true,
  ramda: true,
}

module.exports = (api, options) => {
  options = {
    ...defaultOptions,
    ...options,
  }

  var isEnvProduction = api.env('production')
  var isEnvDevelopment = api.env('development')
  var isEnvTest = api.env('test')
  var isOutside = options.outside === true
  var isTypescript = options.typescript === true
  var isReact = options.react === true
  var isWdyr = isReact && options.wdyr === true
  var isDatefns = options.datefns === true
  var isRamda = options.ramda === true
  // var isVue = options.vue === true

  api.cache(() => JSON.stringify({
    isEnvProduction,
    isEnvDevelopment,
    isEnvTest,
    isOutside,
    isTypescript,
    isReact,
    isWdyr,
    isDatefns,
    isRamda
  }))

  return {
    // Babel assumes ES Modules, which isn't safe until CommonJS
    // dies. This changes the behavior to assume CommonJS unless
    // an `import` or `export` is present in the file.
    // https://github.com/webpack/webpack/issues/4039#issuecomment-419284940
    sourceType: 'unambiguous',
    overrides: [
      isTypescript && {
        test: /\.tsx?$/,
        plugins: [
          [
            require.resolve('@babel/plugin-proposal-decorators'),
            { legacy: true },
          ],
        ],
      },
    ].filter(Boolean),
    presets: [
      isEnvTest && [
        // ES features necessary for user's Node version
        require.resolve('@babel/preset-env'),
        {
          targets: {
            node: 'current',
            // Exclude transforms that make all code slower
          },
          exclude: isOutside ? ['transform-typeof-symbol'] : [],
        },
      ],
      (isEnvProduction || isEnvDevelopment) && [
        // Latest stable ECMAScript features
        require.resolve('@babel/preset-env'),
        {
          // Allow importing core-js in entrypoint and use browserlist to select polyfills
          useBuiltIns: 'entry',
          // Set the corejs version we are using to avoid warnings in console
          corejs: 3,
          // Exclude transforms that make all code slower
          exclude: ['transform-typeof-symbol'],
        },
      ],
      !isOutside && isReact && [
        require.resolve('@babel/preset-react'),
        {
          // Adds component stack to warning messages
          // Adds __self attribute to JSX which React will use for some warnings
          development: isEnvDevelopment || isEnvTest,
          runtime: 'automatic',
          importSource: isWdyr ? '@welldone-software/why-did-you-render' : undefined,
        },
      ],
      !isOutside && isTypescript && [
        require.resolve('@babel/preset-typescript'),
        {
          // TODO: to be added https://babeljs.io/docs/en/babel-preset-typescript
        },
      ],
    ].filter(Boolean),
    plugins: [
      // Turn on legacy decorators for TypeScript files
      !isOutside && [
        require.resolve('@babel/plugin-proposal-decorators'),
        false,
      ],
      // class { handleClick = () => { } }
      // Enable loose mode to use assignment instead of defineProperty
      // See discussion in https://github.com/facebook/create-react-app/issues/4263
      // Note:
      // 'loose' mode configuration must be the same for
      // * @babel/plugin-proposal-class-properties
      // * @babel/plugin-proposal-private-methods
      // * @babel/plugin-proposal-private-property-in-object
      // (when they are enabled)
      !isOutside && [
        require.resolve('@babel/plugin-proposal-class-properties'),
        {
          loose: true,
        },
      ],
      !isOutside && [
        require.resolve('@babel/plugin-proposal-private-methods'),
        {
          loose: true,
        },
      ],
      !isOutside && [
        require.resolve('@babel/plugin-proposal-private-property-in-object'),
        {
          loose: true,
        },
      ],
      // Polyfills the runtime needed for async/await, generators, and friends
      // https://babeljs.io/docs/en/babel-plugin-transform-runtime
      [
        require.resolve('@babel/plugin-transform-runtime'),
        {
          corejs: false,
          helpers: true,
          // By default, babel assumes babel/runtime version 7.0.0-beta.0,
          // explicitly resolving to match the provided helper functions.
          // https://github.com/babel/babel/issues/10261
          version: require('@babel/runtime/package.json').version,
          regenerator: true,
          // https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
          // We should turn this on once the lowest version of Node LTS
          // supports ES Modules.
          useESModules: isEnvDevelopment || isEnvProduction,
          // Undocumented option that lets us encapsulate our runtime, ensuring
          // the correct version is used
          // https://github.com/babel/babel/blob/090c364a90fe73d36a30707fc612ce037bdbbb24/packages/babel-plugin-transform-runtime/src/index.js#L35-L42
          absoluteRuntime: path.dirname(
            require.resolve('@babel/runtime/package.json')
          ),
        },
      ],
      // Optimization
      !isOutside &&
        isEnvProduction && isReact && [
          // Remove PropTypes from production build
          require.resolve('babel-plugin-transform-react-remove-prop-types'),
          {
            removeImport: true,
          },
        ],
      !isOutside &&
        isEnvProduction && isReact && [
          // Transform constant elements for production build
          require.resolve('babel-plugin-transform-react-constant-elements'),
        ],
      // Stage 1: https://github.com/tc39/proposals/blob/master/stage-1-proposals.md
      !isOutside &&
        require.resolve('@babel/plugin-proposal-export-default-from'),
      !isOutside && [
        require.resolve('@babel/plugin-proposal-pipeline-operator'),
        { proposal: 'minimal' },
      ],
      !isOutside && require.resolve('@babel/plugin-proposal-do-expressions'),
      // Stage 2 https://github.com/tc39/proposals#stage-2
      !isOutside && require.resolve('@babel/plugin-proposal-function-sent'),
      !isOutside && require.resolve('@babel/plugin-proposal-throw-expressions'),
      // Stable but not implemented in babel's core-js 3 (for some reason)
      !isOutside && require.resolve('@babel/plugin-transform-new-target'),
      !isOutside &&
        require.resolve('@babel/plugin-proposal-logical-assignment-operators'),
      !isOutside && require.resolve('@babel/plugin-proposal-json-strings'),
      // Libraries
      !isOutside && isRamda && require.resolve('babel-plugin-ramda'),
      !isOutside && isDatefns && require.resolve('babel-plugin-date-fns-next'),
    ].filter(Boolean),
  }
}

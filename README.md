# babel-preset-duy

> Babel preset for duy's react-starter-kit and more. Highly opinionated.

## Install

Using npm:

```sh
npm install --save-dev babel-preset-duy
```

or using yarn:

```sh
yarn add babel-preset-duy --dev
```

## Usage

```js
module.exports = () => {
  return {
    presets: [
      [
        require.resolve("babel-preset-duy"),
        {
          outside: false, // for transform outside of the app, omit most of plugins, optimization
          react: true,
          wdyr: true, // turn on why-did-you-render support
          // vue: false, // Not yet supported
          typescript: true,
          datefns: true, // turn on support for date-fns library
          ramda: true, // turn on support for ramda library
          vanillaExtract: false, // turn on support for vanilla-extract library
        },
      ],
    ],
  };
};
```

## Details

### This preset includes the following presets

- [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)

- [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react): with automatic jsx transform and support for why-did-you-render out of the box

- [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript)

### This preset includes the following plugins

- [@babel/plugin-proposal-class-properties](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)

- [@babel/plugin-proposal-decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators)

- [@babel/plugin-proposal-do-expressions](https://babeljs.io/docs/en/babel-plugin-proposal-do-expressions)

- [@babel/plugin-proposal-export-default-from](https://babeljs.io/docs/en/babel-plugin-proposal-export-default-from)

- [@babel/plugin-proposal-function-sent](https://babeljs.io/docs/en/babel-plugin-proposal-function-sent)

- [@babel/plugin-proposal-json-strings](https://babeljs.io/docs/en/babel-plugin-proposal-json-strings)

- [@babel/plugin-proposal-logical-assignment-operators](https://babeljs.io/docs/en/babel-plugin-proposal-logical-assignment-operators)

- [@babel/plugin-proposal-nullish-coalescing-operator](https://babeljs.io/docs/en/babel-plugin-proposal-nullish-coalescing-operator)

- [@babel/plugin-proposal-optional-chaining](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining)

- [@babel/plugin-proposal-pipeline-operator](https://babeljs.io/docs/en/babel-plugin-proposal-pipeline-operator)

- [@babel/plugin-proposal-throw-expressions](https://babeljs.io/docs/en/babel-plugin-proposal-throw-expressions)

- [@babel/plugin-transform-new-target](https://babeljs.io/docs/en/babel-plugin-transform-new-target)

- [@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-transform-runtime)

- [babel-plugin-transform-react-constant-elements](https://babeljs.io/docs/en/babel-plugin-transform-react-constant-elements)

- [babel-plugin-transform-react-remove-prop-types](https://www.npmjs.com/package/babel-plugin-transform-react-remove-prop-types)

- [babel-plugin-date-fns-next](https://www.npmjs.com/package/babel-plugin-date-fns-next)

- [babel-plugin-ramda](https://www.npmjs.com/package/babel-plugin-ramda)

- [@vanilla-extract/babel-plugin](https://www.npmjs.com/package/@vanilla-extract/babel-plugin)

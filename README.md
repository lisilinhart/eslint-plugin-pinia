# eslint-plugin-pinia

![npm](https://img.shields.io/npm/v/eslint-plugin-pinia)
[![test](https://github.com/lisilinhart/eslint-plugin-pinia/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/lisilinhart/eslint-plugin-pinia/actions/workflows/test.yml)

Eslint plugin that enforces some best practices for writing pinia stores

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-pinia`:

```sh
npm install eslint-plugin-pinia --save-dev
```

## Usage

Add `pinia` to the plugins section of your `.eslintrc` or `eslint.config.js` configuration file. You can omit the `eslint-plugin-` prefix:

```json
// .eslintrc [Legacy Config]
{
  "plugins": ["pinia"]
}
```

```js
// eslint.config.js
import pinia from 'eslint-plugin-pinia'

export default [
  plugins: {
    pinia
  }
]
```

### Rule Configuration

Then configure the rules you want to use under the rules section.

```json
// .eslintrc [Legacy Config]
{
  "rules": {
    "pinia/require-export-define-store": [
      "warn"
    ]
  }
}
```

```js
// eslint.config.js
import pinia from 'eslint-plugin-pinia'

export default [
  {
    plugin: {
      pinia
    },
    rules: {
      "pinia/require-export-define-store": ["warn"]
    }
  }
]
```

### Recommended

To use the recommended configuration, extend it in your `.eslintrc` or `eslint.config.js` file:

```json
// .eslintrc [Legacy Config]
{
  "extends": ["plugin:pinia/recommended"]
}
```

```js
// eslint.config.js
import pinia from 'eslint-plugin-pinia'

export default [
  pinia.configs["recommended-flat"],
]
```

All recommend rules will be set to error by default. You can however disable some rules by setting turning them `off` in your configuration file or by setting them to `warn` in your configuration file.

### all rules

To use the all configuration, extend it in your `.eslintrc` or `eslint.config.js` file:

```json
// .eslintrc [Legacy Config]
{
  "extends": ["plugin:pinia/all"]
}
```

```js
// eslint.config.js
import pinia from 'eslint-plugin-pinia'

export default [
  pinia.configs["all-flat"],
]
```

## Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
⚠️ Configurations set to warn in.\
🚫 Configurations disabled in.\
🌐 Set in the `all` configuration.\
✅ Set in the `recommended` configuration.

| Name                                                                                         | Description                                                                                | 💼   | ⚠️ | 🚫 |
| :------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- | :--- | :- | :- |
| [never-export-initialized-store](docs/rules/never-export-initialized-store.md)               | Never export an initialized named or default store.                                        | 🌐 ✅ |    |    |
| [no-duplicate-store-ids](docs/rules/no-duplicate-store-ids.md)                               | Disallow duplicate store ids.                                                              | ✅    | 🌐 |    |
| [no-return-global-properties](docs/rules/no-return-global-properties.md)                     | Disallows returning globally provided properties from Pinia stores.                        | ✅    | 🌐 |    |
| [prefer-single-store-per-file](docs/rules/prefer-single-store-per-file.md)                   | Encourages defining each store in a separate file.                                         |      |    | 🌐 |
| [prefer-use-store-naming-convention](docs/rules/prefer-use-store-naming-convention.md)       | Enforces the convention of naming stores with the prefix `use` followed by the store name. |      | 🌐 |    |
| [require-setup-store-properties-export](docs/rules/require-setup-store-properties-export.md) | In setup stores all state properties must be exported.                                     | ✅    | 🌐 |    |

<!-- end auto-generated rules list -->

## Credits

- [eslint-plugin-vitest](https://github.com/veritem/eslint-plugin-vitest) The core repository structure came from this eslint plugin

## Licence

[MIT](https://github.com/lisilinhart/eslint-plugin-pinia/blob/main/LICENSE) Licence &copy; 2024

## Contributing

Please check the [Contributing](https://github.com/lisilinhart/eslint-plugin-pinia/blob/main/.github/CONTRIBUTING.md) file.

This project exists thanks to all the people who contribute 😍!

<a href="https://github.com/lisilinhart/eslint-plugin-pinia/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=lisilinhart/eslint-plugin-pinia" />
</a>

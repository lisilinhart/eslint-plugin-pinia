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

Add `pinia` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["pinia"]
}
```

### Rule Configuration

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "pinia/require-export-define-store": [
      "warn"
    ]
  }
}
```

### Recommended

To use the recommended configuration, extend it in your `.eslintrc` file:

```json
{
  "extends": ["plugin:pinia/recommended"]
}
```

All recommend rules will be set to error by default. You can however disable some rules by setting turning them `off` in your `.eslintrc` file or by setting them to `warn` in your `.eslintrc`.

### all rules

To use the all configuration, extend it in your `.eslintrc` file:

```json
{
  "extends": ["plugin:pinia/all"]
}
```

## Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
⚠️ Configurations set to warn in.\
🌐 Set in the `all` configuration.\
✅ Set in the `recommended` configuration.

| Name                                                                                         | Description                                                                                                          | 💼 | ⚠️ |
| :------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- | :- | :- |
| [prefer-single-store-per-file](docs/rules/prefer-single-store-per-file.md)                   | Encourages defining each store in a separate file.                                                                   |    | 🌐 |
| [prefer-use-store-naming-convention](docs/rules/prefer-use-store-naming-convention.md)       | Enforces the convention of naming stores with the prefix `use` followed by the store name and suffixed with `Store`. |    | 🌐 |
| [require-setup-store-properties-export](docs/rules/require-setup-store-properties-export.md) | In setup stores all state properties must be exported.                                                               | ✅  | 🌐 |

<!-- end auto-generated rules list -->

## Credits

- [eslint-plugin-vitest](https://github.com/veritem/eslint-plugin-vitest) The core repository structure came from this eslint plugin

### Licence

[MIT](https://github.com/lisilinhart/eslint-plugin-pinia/blob/main/LICENSE) Licence &copy; 2024

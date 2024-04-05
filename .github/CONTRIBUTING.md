# Contributing to eslint-plugin-pinia

Thank you for considering contributing to eslint-plugin-pinia! Contributions are welcome and will be fully credited!

## How to Contribute

1. Fork the repository and clone it locally.
2. Install dependencies: `npm install`.
3. Make your changes.
4. Run tests: `npm test` (they will also run when you open the PR)
5. Commit your changes using [conventional commits](https://www.conventionalcommits.org/) (see details below).
6. Push your changes to your fork.
7. Open a pull request (PR) against the `main` branch of the `eslint-plugin-pinia` repository.

## Pull Requests

Here are some guidelines to make the process smoother:

- Add a test - New features and bugfixes need tests. If you find it difficult to test, please tell us in the pull request and we will try to help you!
- Document any change in behaviour - Make sure the README.md and any other relevant documentation are kept up-to-date.
- Run npm test locally - This will allow you to go faster
- One pull request per feature - If you want to do more than one thing, send multiple pull requests.
- Send coherent history - Make sure your commits message means something
- Consider our release cycle - We try to follow SemVer v2.0.0. Randomly breaking public APIs is not an option.

## Writing Tests and Documentation

When adding or modifying a rule, please ensure that:

- Tests are included to cover the behavior of the rule in various scenarios.
- Documentation is updated to reflect any changes made to the rule, including usage examples and explanations.

We use vitest for testing. You can find existing tests in the `tests` directory and documentation in the `docs` directory. Please ensure your changes maintain consistency with existing tests and documentation.

To update the documentation, run the following command:

```sh
npm run update:eslint-docs
```

## Commit Message Guidelines

We follow the conventional commits specification for our commit messages. This allows us to automatically generate changelogs and version releases. Each commit message should have a structured format:

### Type

- feat: New feature implementation
- fix: Bug fixes
- docs: Documentation updates
- style: Changes in code formatting, indentation, etc.
- refactor: Code refactoring that doesn't introduce new features or fix bugs
- test: Adding or modifying tests
- chore: Changes related to the build process, tooling, or other non-code changes

### Scope

The scope should specify the rule affected by the change. For example:

- feat(prefer-use-store-naming-convention): Adds a new validation rule to the validator
- fix(prefer-use-store-naming-convention): Fixes a parsing issue in the rule
- docs(prefer-use-store-naming-convention): Updates the README documentation
- style(prefer-use-store-naming-convention): Improves code formatting in the configuration files
- refactor(prefer-use-store-naming-convention): Refactors utility functions in the utils component
- test(prefer-use-store-naming-convention): Adds test cases for API endpoints
- chore(prefer-use-store-naming-convention): Updates build scripts and dependencies


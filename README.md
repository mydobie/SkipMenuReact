# skipmenu-react

## Description:

React wrapper for SkipMenu menu so it can easily be added to a React application.

Read more at the [SkipMenu website](https://github.com/mydobie/skipMenu).

[See skipMenuReact in action](https://mydobie.github.io/SkipMenuReact/).

---

## Getting Started - Adding this component to your project

There are four methods of including this into your project.

### Method 1 create and use tgz file

1.  Clone this project.
1.  Run `npm run buildPackage` to build and tar the component.

The above steps will create a `.tgz` file in the root of this project. Move this `.tgz` file into your project. Add the path to the`.tgz` file to your `package.json` file:

```
dependencies: {
  "@mydobie/skipmenu-react": "file:./path_to_tgz_file.tgz",
}
```

Then run `npm install`.

### Method 2 download tgz file from GitHub

1. Go to the [package page](https://github.com/mydobie/skipmenureact/packages?ecosystem=npm) for this project and download the wanted version of the `.tgz` file.
1. Save the downloaded `.tgz` file into your project.
1. Add the path to the`.tgz` file to your `package.json` file:

```
dependencies: {
  "@mydobie/skipmenu-react": "file:./path_to_tgz_file.tgz",
}
```

Then run `npm install`.

### Method 3 point to GitHub repo

There are some tags in the skipMenuReact repository that contain the package code. In the `package.json` file you can point directly to one of these tags.

1. Go to `https://github.com/mydobie/skipmenureact/tags` and look for tags that start with `npmbuild` followed by a version number. For example `npmbuild 2.1.0`.
1. In your `package.json` file, point to this repository and the tag. For example:

```
dependencies: {
  "@mydobie/skipmenu-react": "mydobie/skipmenureact/#npmbuild1.0.0",
}
```

Then run `npm install`

### Method 4 use GitHubs npm repository

Instead of creating or downloading the `.tgz` file, you can have NPM pull this module as if it were any other module. This process has been documented in the [README_GITHUB](README_GITHUB.md) file.

## Notes

This package is not optimized to be used directly in the browser. It must included in an application that has a build process like using [Webpack](https://webpack.js.org/) for example.

This application can be used both Javascript (jsx) and Typescript (tsx) based applications.

If you wish to use SkipMenu on a non-React application or website, see the [SkipMenu website](https://github.com/mydobie/skipMenu).

---

## Options

The same options are available as in the [skipMenu](https://github.com/mydobie/skipMenu#options), but just pass them as props.

For example:

```
import SkipMenu from 'skipmenu-react';


<SkipMenu theme='bootstrap' useAccessKey text={{buttonLabel: 'Table of Contents'}} />

```

NOTE: By default `reloadOnChange` is always set to `true` so it will stay up to date with page changes. skipMenuReact will automatically attach the menu for you, so there isn't a need to set the `attachTo` prop.

### Theme prop

There is a `theme` prop that will determine which styles will be applied. The available themes are:

- `bootstrap` => Use on pages that already have the Bootstrap CSS framework.
- `patternfly` => Use on pages that already have the Patternfly CSS framework.
- `full` => Use to apply all styles needed to replicate the Bootstrap version.

If no theme is set, then no styles will be applied. Note that in this case, the skipMenu may not function correctly.

---

---

---

## Get me started:

At the root of the project run the following commands in a terminal to verify you can perform all the development tasks:

1.  Verify node is installed => `node -v`. Ensure that it is version listed in the `engines` section of the `package.json` file.
1.  Install dependencies => `npm i`
1.  Verify you can check for lint errors => `npm run lint`
1.  Verify you can run the tests => `npm run test`
1.  Verify you can check for security advisories => `npm run npmAudit`
1.  Start dev server to view demo files => `npm run start` then go to [http://localhost:3000](http://localhost:3000)
1.  Verify you can build the package => `npm run buildPackage`
1.  Verify you can build the demo files => `npm run build`

## Project structure

All of the files that will be bundled into the package are located in the `src/SkipMenuComponents` directory. All other files in the `src` directory are demo pages so you can see the feature flags in a browser during development.

## Special branches

There are special branches that should not be committed to directly.

- `main` - Branch that contains the latest published code. All changes into main should go through a pull request.
- `gh-pages` - Branch that contains the files for the demo page. Updates to this branch happen automatically when a pull request is merged into `main`.
- `npmbuild` - Branch that contains the files for the npm package. Updates to this branch happen automatically when a pull request is merged into `main`.

## Versioning

The version of the application is done automatically when merging a pull request into the main branch. Do not increment the version on the package.json file manually. See [Contributing.md](CONTRIBUTING.md) for more information.

## Node

The only requirement is that development system has Node.js installed. You can verify you have node installed by running `node -v` in a terminal.

NOTE: The development tools require a node version listed in the `engines` section of the `package.json` file.

If have an different version of node running, first verify if you have NVM installed by running `nvm --version` in a terminal. If you do have NVM running, then see the [NVM website](https://github.com/nvm-sh/nvm) on how to install and use a new version of Node.

If you don't have Node nor NVM installed, see the [NodeJS website](https://nodejs.org/en/) on how to install Node.

Alternatively you can choose to develop this application inside a Docker container instead of modifying the version of node or NVM on your machine. See the `DOCKER_DEV_ENV/README.md` file for more information. This is the recommended method for development.

---

## Install dependencies

After checking out the project, run `npm i` in a terminal at the root of the project to install dependencies.

After installing dependencies, you can check to see what dependencies are out of date by running `npm outdated` in a terminal at the root of the project.

## Check security stats of dependencies

You can check if there is any high or critical security advisories for installed dependencies by running `npm run npmAudit`. Note that this application does not have any dependencies that are included in the build code, so this command will always pass. By running this command, any security advisories for the build tools will be shown in the terminal window.

## Start the development server

To start the development server to view the demo files, run `npm run start` in a terminal at the root of the project.

The application wil be available at [http://localhost:3000](http://localhost:3000) in a browser.

If you need to change the port the application is running on, then change the `PORT` value in the `.env` file. This `PORT` value is only used for the development server and will not impact a production or production-like (like staging) environment.

### Run tests

NOTE: Currently there aren't any tests for this application because it a simple wrapper for the SkipMenu script. Once tests are developed, they should lbe following the following guidelines:

To run the tests, run `npm run test` in a terminal the root of the project. This will run all of the tests in the `src/__tests__` directory.

After running tests, you can check the coverage reports by opening `coverage/index.html` in a browser or by running `npm run checkCoverage` in a terminal.

If you prefer, you can have the testing run in "watch" mode by running `npm run test:watch` in a terminal at the root of the project. The tests will be rerun as you make edits. Note coverage reports will not be updated while in watch mode.

Test are run in [Jest](https://jestjs.io/docs/en/expect), use [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) to inspect components, and [jest-axe](https://github.com/nickcolley/jest-axe) to check for accessibility.

### Linting

You can check the linting status of your files by running `npm run lint` in a terminal at the root of the project.

To fix known issue, you can run `npm run lint:fix`. NOTE: You may need to run this command multiple times until you get a successful run in order to fix all issues.

If you want linting issues fixed as you save files, run `npm run lint:watch` in a terminal at the root of the project.

More information on fixing linting errors is available at: [esLint](https://eslint.org/docs/rules/) | [Prettier](https://prettier.io/docs/en/install.html) |[airbnb JS style guide](https://github.com/airbnb/javascript)

This application uses [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged) to automatically install Git Hooks that will check for linting errors on files at commit time. All linting errors must be fixed before changes can be committed to git.

### Build dist files

To build the dist files that can be used on a web page run `npm run build`. If you want the files re-built when you save a file, run `npm run build:watch`. The build files will be located in the `lib` directories.

---

## GitHub actions

This repository uses numerous GitHub actions to run tests, build files, and create tags. Many of these actions will happen automatically, but some of them can be run manually.

The status of any actions can be viewed on the [actions page](https://github.com/mydobie/skipMenuReact/actions). The action files are located in the `.github/workflows` directory.

### Run tests

All pull requests will have the following tests run:

- Linting
- Check for high or critical security advisories
- Unit tests (Jest)
- Functional tests (Cypress)
- Verify that the code can be built

If you want to run these tests against another branch, you can do the following at any time:

1. Go to [the test code actions page](https://github.com/mydobie/skipMenuReact/actions/workflows/test_code.yml) and click "Run workflow" drop down.
1. Choose the branch you want to run the tests against.

If you get a "Workflow does not exist or does not have a workflow_dispatch trigger in this branch" warning, be sure that the `.github/workflows/test_and_build.yml` file exists on the branch.

### Update version, publish package, update demo site

When a pull request is merged into the `main` branch, the following is automatically run.

- Linting
- Check for high or critical security advisories
- Unit tests (Jest)
- Functional tests (Cypress)
- Updates version on package.json (see [CONTRIBUTING for more information](CONTRIBUTING.md))
- Creates a [release](https://github.com/mydobie/skipMenuReact/releases)
- Updates the [demo site](https://mydobie.github.io/skipMenuReact) on the `gh-pages` branch.

**Note** that these series of actions can take a while. Check the [actions page](https://github.com/mydobie/skipMenuReact/actions) to see if there are any actions still running.

**Note** that approvers will need to manually update the [release](https://github.com/mydobie/skipMenuReact/releases) text. See [CONTRIBUTING](CONTRIBUTING.md) on what is required for the release text.
Based on template version 0.0.2

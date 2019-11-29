

# TestWorkspace

This is a monorepo based project architecture using [Nx](https://nx.dev).

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/docs/install#mac-stable)
  - `brew install yarn`
  
  
## To Run the Apps

- `yarn install`
- `npm start`

## Projects

- Frontend App
- Backend API

### Modules

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png" width="450"></p>

- ui : For UI React Components & jest tests
  - Form
  - Input
  - Status Box
  - Table
  
- common : Common Utilities & jest tests
  - CreditCardValidator : Used in both Frontend and API
  - HTTP : Wrapper around `fetch API`
  - Types
  
- model : models, interfaces


## Development server

Run `npm start` for dev servers.

Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.


## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run test` to execute all unit tests via [Jest](https://jestjs.io).

To run unit tests on  individual modules

- `npm run test:model`
- `npm run test:ui`
- `npm run test:frontend`


## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io).


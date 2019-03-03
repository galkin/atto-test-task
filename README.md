# ATTO Test Task

[Task description](docs/Full%20Stack%20JavaScript%20Test.pdf)

## Development

### Tooling

- [Node.js](https://nodejs.org/en/) with LTS version. Right now 10.15.1
- [npm](https://docs.npmjs.com/about-npm/) version 6.4.1
- [typescript](https://www.typescriptlang.org/) for typechecking and support decorators, BigInt. 

### Project structure

Project structure based on [The Entity-Control-Boundary Pattern](http://www.cs.sjsu.edu/~pearce/modules/patterns/enterprise/ecb/ecb.htm)

#### Boundaries
- *coincap* - client for [coincap api](https://docs.coincap.io/)

#### Entities
Classes with [class-transformer](https://github.com/typestack/class-transformer) decorators for models from Domain.


#### Controls

##### Scrapper

Store last assets values.

## Configuration

We use [The Twelve Factors manifest](https://12factor.net). Check `.env.example` file

## Running

#### Develop mode
Run `npm run watch`. Auto any changes at `src` folder nodemon will restart application.

#### Standard mode
Run `npm run build` and then `npm run start`

### Dockerized node
Run `docker-compose up`

## Testing Approach

- [tslint](https://palantir.github.io/tslint/) is used for checking code style and TS best practice. Use `npm run lint-fix` for autofixing common tslint errors.
- [typescript](https://www.typescriptlang.org/) is used for checking types.
- [jest](https://facebook.github.io/jest/) is not implemented, but planned.

## Deploy

This is test task. There are not deploy, but it can easily deploy to any environment.

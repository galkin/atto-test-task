# ATTO Test Task

[Task description](docs/Full%20Stack%20JavaScript%20Test.pdf)

This task implemented with [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) instead WS. Motivation:
- Based on the requirements we need only events from Server, so WS as duplex protocol is overhead.  
- Based on the requirements we need auto-reconnection, SSE has that from the box.
- Project evolving will require subscriptions in WS. REST routing is simpler for implementation.
- Known SSE limitation resolved by using http2 and eventsource-polyfill
- The last, but not the least coincap already has [WS API](https://docs.coincap.io/#37dcec0b-1f7b-4d98-b152-0217a6798058)

Other notices:
- Scrapping timout decrised and added checking do we have new values.
- Frontend implemented with React as render library without bundling via WebPack.

## Development

### Tooling

- [Node.js](https://nodejs.org/en/) with LTS version. Right now 10.15.1
- [npm](https://docs.npmjs.com/about-npm/) version 6.4.1
- [typescript](https://www.typescriptlang.org/) for typechecking and support decorators, BigInt. 

### Project structure

Project structure based on [The Entity-Control-Boundary Pattern](http://www.cs.sjsu.edu/~pearce/modules/patterns/enterprise/ecb/ecb.htm)

#### Boundaries
- *coincap* - client for [coincap api](https://docs.coincap.io/)
- *http2-server* - server with http2 support. In production should be protected by Nginx.

#### Entities
Classes with [class-transformer](https://github.com/typestack/class-transformer) decorators for models from Domain.

#### Controls

##### Scrapper

Store last assets values.

## Configuration

We use [The Twelve Factors manifest](https://12factor.net). Check `.env.example` file and **create `.env` copy** for local development.

## Running

#### Develop mode
Run `npm run watch`. Auto any changes at `src` folder nodemon will restart application.

#### Standard mode
`npm run start`

### Dockerized node
Run `docker-compose up`

## Testing Approach

- [tslint](https://palantir.github.io/tslint/) is used for checking code style and TS best practice. Use `npm run lint-fix` for autofixing common tslint errors.
- [typescript](https://www.typescriptlang.org/) is used for checking types.
- [jest](https://facebook.github.io/jest/) is not implemented, but planned.

## Deploy

This is test task. There are not autodeploy, but it can easily deploy to any Docker-based environment.

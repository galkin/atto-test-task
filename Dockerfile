FROM node:10.15.1-alpine

ENV APP_WORKDIR=/usr/src/app/

RUN apk update && apk upgrade && \
   apk add --virtual build-deps git openssh-client py-pip make g++

COPY package.json package-lock.json $APP_WORKDIR
WORKDIR $APP_WORKDIR

RUN npm install --no-optional
COPY .env.example tsconfig.json $APP_WORKDIR
COPY keys $APP_WORKDIR/keys
COPY public $APP_WORKDIR/public
COPY src $APP_WORKDIR/src
RUN npm run build

RUN apk del build-deps
RUN rm -rf tsconfig.json tsconfig-app.json src
RUN npm prune --production


EXPOSE 8443
ENTRYPOINT ["node", "build/index.js"]

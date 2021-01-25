# Users REST API

## Description
  Simple API REST to manipulate users

  You can run all endpoints through Swagger available on
```
/docs
 ```
 There is also a Postman collection under the postman folder
 
## Installation

```bash
$ npm install
$ docker-compose -f docker-compose-db.yml up -d
$ cp .env-sample .env
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Running the app using docker

```bash
$ docker-compose up -d
```

## Endpoints
#### available on port 3000
```
/users
```

## Swagger documentation
```
/docs
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

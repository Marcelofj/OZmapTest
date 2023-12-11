# OZmap Test
![Generic badge](https://img.shields.io/badge/maintainer-Marcelo_Francisco-purple.svg)
![Generic badge](https://img.shields.io/badge/version-1.0.0-orange.svg)
![Generic badge](https://img.shields.io/badge/coverage-95-green.svg)
![Generic badge](https://img.shields.io/badge/NodeJS-20.10.0-blue.svg)

## API

## Description

Back-end for OZmap challenge.
 
## Routes

* v1
  * GET: /api/v1/users
  * GET: /api/v1/users/id
  * POST: /api/v1/users
  * PATCH: /api/v1/users/id
  * DELETE: /api/v1/users/id
  * GET: /api/v1/regions
  * GET: /api/v1/regions/id
  * POST: /api/v1/regions
  * PATCH: /api/v1/regions/id
  * DELETE: /api/v1/regions/id
  * POST: /api/v1/regions/point
  * POST: /api/v1/regions/near-point
  

## Tech Stack

*  [Node.js](https://nodejs.org/en/)
*  [Express](https://expressjs.com/)
*  [MongoDB](https://www.mongodb.com/pt-br/)
*  [Mongoose](https://mongoosejs.com/)
*  [OpenCage](https://opencagedata.com/)
*  [Swagger](https://swagger.io/)
*  [Jest](https://jestjs.io/pt-BR/)

### External Services

*  OpenCage

## Variables Local

Variables local used for running and debugging the application

```
HOSTNAME=localhost
PORT=3000
ENV=development
MONGO_DBNAME=OZMap
MONGO_URI=<mongo/docker/connection/uri>
OPENCAGE_API_KEY=<opencage/api/key>
```

## Run Application
```
cd api/
yarn
yarn dev
```

## Run Tests
```
yarn test
```

## Run Swagger
```
http://localhost:3000/api/v1/docs/
```



## APP

## Description

Front-end for OZmap challenge.
  

## Tech Stack

*  [React](https://react.dev/)
*  [React Router](https://reactrouter.com/en/main)

## Run Application
```
cd app/
yarn
yarn dev
```

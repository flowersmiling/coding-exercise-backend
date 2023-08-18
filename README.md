# coding-exercise-backend
A `node` server with a set of `RESTful` services using entirely `TypeScript` language.

## Features
- TypeScript language
- Express + TypeScript plugin
- Experimental TypeScript decorators.
- TypeScript decorators for `RESTful` services

# Running Server locally
## Prerequisites

First, ensure you have the following installed:

1. Node - Download and Install latest version of Node: [NodeJS](http://http://nodejs.org)
2. Git - Download and Install [Git](http://git-scm.com)
3. MongoDB - `npm install mongodb`
4. Cors - `npm i cors --save-dev @types/cors`
5. Express - `npm i express`

After that, use `Git bash` to run all commands if you are on Windows platform.

## Clone repository

In order to start the project use:

```bash
$ git clone https://github.com/flowersmiling/coding-exercise-backend.git
$ cd coding-exercise-backend
```

## Install dependencies

You'll need to download some node modules defined into `package.json` file.

```
npm install
```

## Build the app
Run the following command

```
npm build
```

This will generate a `dist` directory(JavaScript output files).

## Run the app

```
npm start
```

Now open your browser here: [http://localhost:3000/](http://localhost:3000/)

You'll have available the following `RESTful` services:

```
GET http://localhost:3000/tasks/doing
GET http://localhost:3000/tasks/done
POST http://localhost:3000/tasks
PUT http://localhost:3000/tasks/:id
DELETE http://localhost:3000/tasks
```

If you want to change the port, please update `index.ts` file.

## License

MIT

# Hono Starter

A Hono starter boilerplate for Typescript with minimal dependencies and a clean architecture. All dependencies are initiated at the start of the application and passed to the controllers and services. A swagger API doc is attached in the static folder `openapi.yaml`

### API Doc powered by Swagger UI
<img width="1538" alt="Preview Swagger API Doc" src="/static/preview-swagger.png">

### Database browser powered by Drizzle Studio
<img width="1571" alt="Drizzle Studio" src="/static/drizzle-kit.png">

## Stack

- Authentication: JWT
- Validation: Zod
- Worker: Bullmq
Logging: Pino
ORM: Drizzle
Queue: Redis
DB: MySQL
Runtime: NodeJS
Framework: Hono
API Doc: Swagger
Language: Typescript
Package Manager: Yarn

## Install dependencies

```bash
yarn
```

## Run the app

Create a new file `.env` in the root folder and copy contents from the `.env.example` file.

```bash
docker compose up -d
```

### Generate db tables

```bash
yarn db:generate
```

### Migrate schema
```bash
yarn db:migrate
```

### Open Swagger UI
```bash
open http://localhost:3000/doc
```

### API Doc

The OpenAPI Yaml doc is in the `static` folder.

## Drizzle Studio for Database Browsing

```bash
npx drizzle-kit studio
open https://local.drizzle.studio
```
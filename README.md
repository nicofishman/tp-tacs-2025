# tp-tacs

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines React, React Router, Elysia, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **React Router** - Declarative routing for React
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Elysia** - Type-safe, high-performance framework
- **Bun** - Runtime environment
- **Prisma** - TypeScript-first ORM
- **MongoDB** - Database engine
- **Authentication** - Better-Auth
- **Biome** - Linting and formatting
- **Turborepo** - Optimized monorepo build system

## Getting Started

First, install the dependencies:

```bash
bun install
```

## Database Setup

This project uses MongoDB with Prisma ORM.

1. Make sure you have MongoDB set up.
2. Update your `apps/server/.env` file with your MongoDB connection URI.

3. Generate the Prisma client and push the schema:

```bash
bun db:push
```

Then, run the development server:

```bash
bun dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to see the web application.
The API is running at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
tp-tacs/
├── apps/
│   ├── web/         # Frontend application (React + React Router)
│   └── server/      # Backend API (Elysia)
```

## Available Scripts

- `bun dev`: Start all applications in development mode
- `bun build`: Build all applications
- `bun dev:web`: Start only the web application
- `bun dev:server`: Start only the server
- `bun check-types`: Check TypeScript types across all apps
- `bun db:push`: Push schema changes to database
- `bun db:studio`: Open database studio UI
- `bun check`: Run Biome formatting and linting

# Guia de arranque con Docker

## Requisitos

- Docker Desktop
- Postman

## Comandos

1. Una vez parado dentro de apps\server

``` bash
docker compose exec tacs-backend bunx prisma generate --schema=prisma/schema.prisma
```

2. Siguiendo dentro de apps\server

```bash
docker compose up -d --build
```

3.

```bash
docker exec -it tacs-mongo mongosh --eval "rs.initiate({_id:'rs0', members:[{ _id:0, host:'tacs-mongo:27017' }]})"
```

4. Verificar estado. Deberia mostrar ```json "stateStr": "PRIMARY"```

```bash
docker exec -it tacs-mongo mongosh --eval "rs.status()"
```

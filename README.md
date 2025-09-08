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

- Abrir Docker Desktop
- Postman

## Comandos

1. Dentro de apps\server

```bash
docker compose up -d --build
```

2.

```bash
docker exec -it tacs-mongo mongosh
```

3. Este comando deberia devoler ```json {ok:1}```

```bash
rs.initiate({
_id: "rs0",
members: [{ _id: 0, host: "tacs-mongo:27017" }]
})
```

4. Este comando, dentro de members, deberia decir ```json stateSte:'PRIMARY'```

```bash
rs.status()
```

5. Ahora quedaria correr requests en Postman.

6. Para actualizar el prisma:
En maquina local:
```bash
bunx prisma generate --schema="apps/server/prisma/schema.prisma"
bunx prisma db push --schema="apps/server/prisma/schema.prisma"
```
En Docker:
```bash
docker compose exec backend bunx prisma generate --schema=prisma/schema.prisma
docker compose exec backend bunx prisma db push --schema=prisma/schema.prisma
```
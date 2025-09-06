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
bunx prisma generate --schema="apps/server/prisma\schema.prisma"
bunx prisma db push
```
En Docker:
```bash
docker compose exec backend bunx prisma generate --schema=prisma/schema.prisma
docker compose exec backend bunx prisma db push --schema=prisma/schema.prisma
```

# Prueba con Postman

A continuación se listan los principales casos de prueba para la API, junto con lo esperado en cada uno:

# Health Check (GET /health)
    - Esperado: 200 OK, { status: "ok", "database": "connected" }

## Usuario
# Creación de usuario (POST /usuarios)

- **Crear usuario - éxito**
	- Body: nombre, email válido, rol válido
	- Esperado: 201 Created, usuario creado
- **Crear usuario - email inválido**
	- Body: email no válido
	- Esperado: 400 Bad Request, error de validación "Email inválido"
- **Crear usuario - rol inválido**
	- Body: rol no existente
	- Esperado: 400 Bad Request, error de validación "Rol inválido"
- **Crear usuario - email repetido**
	- Body: email ya registrado
	- Esperado: 409 Conflict, "El email ya está registrado"

# Prueba con Postman

A continuación se listan los principales casos de prueba para la API, junto con lo esperado en cada uno:

## Health Check

- **GET /health**
	- Esperado: 200 OK
	- Respuesta ejemplo:
		```json
		{
			"status": "ok",
			"database": "connected"
		}
		```

## Usuarios

### Creación de usuario (POST /usuarios)

- **Crear usuario - éxito**
	- Body:
		```json
		{ "nombre": "Juan Pérez", "email": "juan.perez@example.com", "rol": "ADMIN" }
		```
	- Esperado: 201 Created, usuario creado
- **Crear usuario - email inválido**
	- Body:
		```json
		{ "nombre": "Ana", "email": "no-es-un-email", "rol": "USER" }
		```
	- Esperado: 400 Bad Request, error de validación "Email inválido"
- **Crear usuario - rol inválido**
	- Body:
		```json
		{ "nombre": "Pedro", "email": "pedro@example.com", "rol": "NOEXISTE" }
		```
	- Esperado: 400 Bad Request, error de validación "Rol inválido"
- **Crear usuario - email repetido**
	- Body:
		```json
		{ "nombre": "Juan Pérez", "email": "juan.perez@example.com", "rol": "ADMIN" }
		```
	- Esperado: 409 Conflict, "El email ya está registrado"
- **Crear usuario - nombre vacío**
	- Body:
		```json
		{ "nombre": "", "email": "vacio@example.com", "rol": "USER" }
		```
	- Esperado: 400 Bad Request, error de validación "El nombre no puede estar vacío"
- **Crear usuario - sin nombre**
	- Body:
		```json
		{ "email": "sin.nombre@example.com", "rol": "USER" }
		```
	- Esperado: 400 Bad Request, error de validación "El nombre es requerido"

### Listado y consulta

- **Listar usuarios (GET /usuarios)**
	- Esperado: 200 OK, array de usuarios
- **Obtener usuario por ID - éxito (GET /usuarios/:id)**
	- ID válido existente
	- Esperado: 200 OK, usuario correspondiente
- **Obtener usuario por ID - ID inexistente**
	- ID válido pero no existe
	- Esperado: 404 Not Found, "Usuario no encontrado"

### Reemplazo de usuario (PUT /usuarios/:id)

- **Reemplazar usuario - éxito**
	- Body:
		```json
		{ "nombre": "Carlos", "email": "carlos@example.com", "rol": "INVITADO" }
		```
	- Esperado: 200 OK, usuario actualizado
- **Reemplazar usuario - rol inválido**
	- Body:
		```json
		{ "nombre": "Carlos", "email": "carlos@example.com", "rol": "NOEXISTE" }
		```
	- Esperado: 400 Bad Request, error de validación "Rol inválido"
- **Reemplazar usuario - email inválido**
	- Body:
		```json
		{ "nombre": "Carlos", "email": "no-es-email", "rol": "INVITADO" }
		```
	- Esperado: 400 Bad Request, error de validación "Email inválido"
- **Reemplazar usuario - usuario inexistente**
	- ID válido pero no existe
	- Esperado: 404 Not Found, "Usuario no encontrado"

### Actualización parcial (PATCH /usuarios/:id)

- **Actualizar usuario - éxito**
	- Body:
		```json
		{ "email": "nuevo.email@example.com" }
		```
	- Esperado: 200 OK, usuario actualizado
- **Actualizar usuario - body vacío**
	- Body:
		```json
		{}
		```
	- Esperado: 400 Bad Request, "Debes enviar al menos un campo para actualizar"
- **Actualizar usuario - email inválido**
	- Body:
		```json
		{ "email": "no-es-email" }
		```
	- Esperado: 400 Bad Request, error de validación "Email inválido"
- **Actualizar usuario - usuario inexistente**
	- ID válido pero no existe
	- Esperado: 404 Not Found, "Usuario no encontrado"

### Eliminación (DELETE /usuarios/:id)

- **Eliminar usuario - éxito**
	- ID válido existente
	- Esperado: 204 No Content
- **Eliminar usuario - usuario inexistente**
	- ID válido pero no existe
	- Esperado: 404 Not Found, "Usuario no encontrado"



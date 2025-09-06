# Prueba con Postman

Importar el archivo 'tp-tacs.json' en Postman para tener las colecciones de pruebas.
Asignar la variable de entorno 'baseUrl' a 'http://localhost:3000' para apuntar a la API local.
Asignar la variable de entorno 'usuarioId' con un ID de usuario válido para las pruebas que lo requieran.
Asignar la variable de entorno 'usuarioId1' con otro ID de usuario válido para pruebas de delete.
Asignar la variable de entorno 'usuarioIdInvalido' con un ID de usuario que no exista en la base de datos.
Asignar la variable de entorno 'eventoId' con un ID de evento válido para las pruebas que lo requieran.

A continuación se listan los principales casos de prueba para la API, junto con lo esperado en cada uno:

# Health Check (GET /health)
    - Esperado: 200 OK, { status: "ok", "database": "connected" }

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

## Categorías

### Creación de categoría (POST /categorias)

- **Crear categoría - éxito**
	- Body:
		```json
		{ "nombre": "Conferencia" }
		```
	- Esperado: 201 Created, categoría creada
- **Crear categoría - nombre vacío**
	- Body:
		```json
		{ "nombre": "" }
		```
	- Esperado: 400 Bad Request, error de validación "El nombre no puede estar vacío"
- **Crear categoría - sin nombre**
	- Body:
		```json
		{}
		```
	- Esperado: 400 Bad Request, error de validación "El nombre es requerido"
- **Crear categoría - nombre repetido**
	- Body:
		```json
		{ "nombre": "Conferencia" }
		```
	- Esperado: 409 Conflict, "El nombre ya está registrado"

### Listado y consulta

- **Listar categorías (GET /categorias)**
	- Esperado: 200 OK, array de categorías
- **Obtener categoría por ID - éxito (GET /categorias/:id)**
	- ID válido existente
	- Esperado: 200 OK, categoría correspondiente
- **Obtener categoría por ID - ID inexistente**
	- ID válido pero no existe
	- Esperado: 404 Not Found, "Categoría no encontrada"

### Eliminación (DELETE /categorias/:id)

- **Eliminar categoría - éxito**
	- ID válido existente
	- Esperado: 204 No Content
- **Eliminar categoría - categoría inexistente**
	- ID válido pero no existe
	- Esperado: 404 Not Found, "Categoría no encontrada"


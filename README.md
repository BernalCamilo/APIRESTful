# Ticket API - Gestión de Eventos y Reservas

API RESTful para la gestión de eventos y reservas de boletos. Esta solución incluye autenticación de eventos, gestión de disponibilidad, registro de reservas y despliegue en la nube.

## Arquitectura General

* **Backend**: Node.js + Express
* **Base de Datos**: PostgreSQL
* **ORM**: Sequelize
* **Contenedores**: Docker
* **Despliegue**: Heroku

## Tecnologías Utilizadas

* Node.js
* Express
* Sequelize ORM
* PostgreSQL
* Docker
* Heroku

## Endpoints Disponibles

### Eventos

* `GET /events`: Obtener todos los eventos
* `POST /events`: Crear un nuevo evento
* `PUT /events/:id`: Actualizar un evento existente
* `DELETE /events/:id`: Eliminar (cancelar) un evento

### Reservas

- `GET /reservations`  
  - **Sin parámetros**: Lista todas las reservas existentes.  
  - **Con parámetro `email`**: Filtra las reservas por correo electrónico.  
    Ejemplo:  
    [`/reservations?email=juan@example.com`](https://ticket-api-backend-555ebd5c6b07.herokuapp.com/reservations?email=juan@example.com)
* `POST /reservations`: Crear una nueva reserva
* `PUT /reservations/:id`: Editar una reserva existente (sin modificar el evento)
* `DELETE /reservations/:id`: Cancelar una reserva

## Instrucciones para Ejecutar el Proyecto

### Clonar el Repositorio

```bash
git clone https://github.com/BernalCamilo/APIRESTful.git
cd APIRESTful
```

### Configurar Variables de Entorno

Crea un archivo `.env` con el siguiente contenido:

```env
DB_NAME=nombre_basedatos
DB_USER=usuario
DB_PASSWORD=contraseña
DB_HOST=localhost
PORT=3000
```

### Construir y Ejecutar con Docker

```bash
docker-compose up --build
```

### Inicializar la Base de Datos

```bash
docker-compose exec backend npx sequelize-cli db:migrate
```

### Insertar Datos de Prueba

```bash
docker-compose exec backend node seedMockEvents.js
```

## Despliegue y Accesibilidad Pública

El proyecto está desplegado en Heroku y disponible en:

🔗 [https://ticket-api-backend-555ebd5c6b07.herokuapp.com](https://ticket-api-backend-555ebd5c6b07.herokuapp.com)

## Verificación de la API

Puedes usar Postman para verificar el funcionamiento de los endpoints. Todos han sido probados exitosamente.

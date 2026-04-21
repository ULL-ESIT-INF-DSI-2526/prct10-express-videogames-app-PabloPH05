# Práctica 10 - Creación de una aplicación Express para gamers

**Asignatura:** Desarrollo de Sistemas Informáticos  
**Alumno:** Pablo Pérez Hernández  
**Correo:** [alu0101619002@ull.edu.es]

## 📝 Descripción

Evolución de la aplicación para gamers hacia una arquitectura basada en un **servidor web HTTP** utilizando **Express**. La aplicación permite gestionar una colección de videojuegos (añadir, modificar, eliminar, listar y consultar) mediante una API REST.

A diferencia de versiones anteriores basadas en sockets TCP, esta implementación utiliza métodos estándar de HTTP (GET, POST, PATCH, DELETE) y procesa los datos en formato JSON. La persistencia se mantiene en el sistema de ficheros del servidor, organizando los videojuegos en directorios por usuario.

## Estado del repositorio:


## 🚀 Guía rápida de uso

Primero es necesario instalar todas las dependencias y compilar el código TypeScript:

```bash
npm install
npx tsc
```

### 1\. Ejecutar el servidor Express:

```bash
node dist/server.js
```

El servidor comenzará a escuchar peticiones en el puerto `3000`.

### 2\. Interactuar con la API:

Puedes utilizar un cliente HTTP como **Postman**, **Insomnia** o `curl`. Todas las peticiones deben incluir el parámetro `user` en la query string.

| Operación | Método | Ruta | Parámetros Query |
| :--- | :--- | :--- | :--- |
| **Listar juegos** | `GET` | `/videogames` | `?user=nombre` |
| **Ver un juego** | `GET` | `/videogames` | `?user=nombre&id=ID` |
| **Añadir juego** | `POST` | `/videogames` | `?user=nombre` (Body JSON) |
| **Modificar** | `PATCH` | `/videogames` | `?user=nombre&id=ID` (Body JSON) |
| **Eliminar** | `DELETE` | `/videogames` | `?user=nombre&id=ID` |

### 3\. Ejecutar los tests:

Los tests verifican los puntos de acceso de la API realizando peticiones al servidor en ejecución (usando `axios` o `supertest`).

```bash
npm run test
```

## 📂 Contenido

El código fuente se encuentra en la carpeta `src/` y sigue una estructura modular:

  * **`server.ts`**: Punto de entrada de la aplicación. Configura Express, define las rutas y gestiona la lógica de las peticiones HTTP y las respuestas JSON.
  * **`types.ts`**: Definición de interfaces (`Videogame`), tipos de respuesta (`ResponseType`) y enumerados para plataformas y géneros, garantizando tipado estricto en toda la app.
  * **Persistencia**: La lógica de gestión de archivos se implementa mediante el API asíncrono de promesas de Node.js (`fs/promises`), almacenando cada juego en un fichero `.json` dentro de `database/user/`.

## 🛠️ Tecnologías utilizadas

  * **Node.js**: Entorno de ejecución.
  * **Express**: Framework para la creación del servidor HTTP.
  * **TypeScript**: Lenguaje de programación con tipado estricto.
  * **Mocha & Chai**: Framework de pruebas y biblioteca de aserciones.
  * **Axios**: Cliente HTTP para las pruebas de integración.

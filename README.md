# git-escape-rooms
AA2-EntornosDesarrollo-EscapeRooms

En este proyecto se ha desarrollado una aplicación web funcional completa (Frontend y Backend) basada en un supuesto real a través de la gestión de Escape Rooms en España.
La aplicación permite a los usuarios gestionar la información a través del CRUD completo (Crear, Leer, Actualizar y Eliminar) sobre dos elementos principales: Ciudades y Salas de Escape.

**Tecnologías Utilizadas**
- Frontend:
  -   Bootstrap: Interfaz de usuario, para los botones o los formularios.
  -   JavaScript: Parte de código del frontend con manipulación del DOM y uso de la API REST mediante la función fetch().

- Backend con Base de Datos
  -   API REST: Desarrollo del servidor para gestionar de forma eficiente las peticiones HTTP (GET, POST, PUT, DELETE)
  -   SQLite3: Base de datos relacional utilizada para crear las tablas y almacenar de forma persistente, estructurada y segura toda la información del proyecto.
  -   Hoppscoth: Utilizado durante la fase de desarrollo para testear y validar de forma aislada todo el CRUD del servidor antes de realizar la integración final con   el frontend.

**Funcionalidades Implementadas (CRUD)**
La plataforma permite gestionar los 2 elementos (ciudades y salas):

1.	Gestión de Ciudades (Elemento 1):
  -   Registrar: Añadir nuevas ciudades y sus zonas.
  -   Visualizar: Listado dinámico de las localizaciones actuales consultadas directamente a la base de datos.
  -   Editar: Modificación del nombre y la zona.
  -   Eliminar: Borrado seguro con alertas de confirmación.

3.	Gestión de Salas (Elemento 2)
  -   Registrar: Alta de nuevos juegos con su dificultad, temática, límite de jugadores y estado de tendencia.
  -   Visualizar: Catálogo completo con todos los atributos extraídos mediante sentencias SQL.
  -   Editar: Actualización de cualquier parámetro de la sala.
  -   Eliminar: Retirada de salas del sistema con alertas de confirmación.

**Flujo de Trabajo en GitHub (Git Flow)**
El proyecto se ha gestionado utilizando control de versiones en GitHub. Cumpliendo con los requisitos del proyecto, no se ha trabajado directamente sobre la rama principal. Cada nueva funcionalidad (ej. CRUD de ciudades, CRUD de salas) o incidencia (ej. error del inner) se ha desarrollado en una nueva rama de trabajo independiente y, una vez terminada, se ha fusionado a develop utilizando Pull Requests.

**Instrucciones de Puesta en Marcha**
Para ejecutar este proyecto en tu entorno local, sigue estos pasos:
1.	Conectar el Backend
  Abre el proyecto en SVCode. Abre la terminal, bajo la dirección: “git-escape-rooms\backend” escribe: npm start
  Se conecta en el puerto 8081.
2. Ejecutar el Frontend
  Con el servidor del backend corriendo, abre el archivo index.html directamente en cualquier navegador web.
    -   Desde index.html podrás gestionar las Ciudades.
    -   Desde el botón de navegación podrás - ir a Salas - para gestionar las Salas.



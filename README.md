# Delilah
El objetivo el proyecto consiste en construir un API Rest para una tienda de comidad que use nodejs y mysql. Bajo un modelo de base de datos relacional y la documentación de la API con los endpoints.

#### Caracteristicas
- Usuario se registra con JWT
- Validacion por roles
- CRUD Usuarios
- CRUD Platos
- CRUD Ordenes
- Request adiciona parametros en el body para validacion
- Usuario tiene opcion de platos favoritos.

## Requisitos
### 1. Inicializar servidor
1. Usted necesitará [nodejs](https://nodejs.org). para visualizar si ya cuenta con node instalado simplemente ingrese el comando en la terminal - cmd.
```bash
node --version
```
2. Una vez confirmado que cuenta con nodejs [clone](https://git-scm.com/) el repositorio, instale las dependencias 

```bash
git clone https://github.com//gvasque6/Delilah.git
cd DelilahResto
npm install
```
3. En el archivo ".env" se encuentran las variable de entorno con relacion a la clave la contraseña por defecto es 'abc123' la cual se puede modificar por alguna de su preferencia.
```bash
sed -i 's/CAMBIE_SU_CLAVE/ejemplo_clave/g' .env
```
En la linea anterior reemplace `ejemplo_clave` por el valor que usted desee, esto será usado para encriptar los tokens!

### 2. Configure la base de datos
1. Instale [XAMPP](https://www.apachefriends.org/index.html) el cual incluye servidor apache y mysql.
1. Abra XAMPP e inicialice `Apache` y `MySQL`. asegurese que Mysql corre en el puerto `3306`.
1.  En `MySQL` asegurece que tenga ingreso de administrador con perfil `root` contraseña por defecto, se recomienda cambiarla.
1. Se tiene dos opciones para cargar la base de datos:
    * *OPCION A)* Cree una base de datos de ejemplo `delilah-resto` y asegure la información [here](./src/services/database/config/index.js) esta correcta. Luego ejecute `npm run populateData`.
    * *OPCION B)* Importe [this file](./src/services/database/init-config.sql) este archivo contiene todos los scripts para generar las tablas, y la relaciones entre ellas con información básica.

Hasta aca se ha configurado la base de datos y se ha instalado nodejs.

**Note**: Se ha creado el usuario  `admin` y la contraseña es `admin`. un usuario valido podria ser `adln` y la contraseña `anotherpassword`.

### 3. Inicializando el servidor
Abra la terminal y ejecute el comando.
```bash
npm run start
```
### 4. Listo!
Esto es todo lo que necesita.

## Descripcion de los Endpoints
Los endpoints se detallan en este archivo [this YALM file](./design/API/spec.yml) y están diseñados con la siguiente especificación [OPEN API specifications](https://swagger.io/specification/#:~:text=Introduction,or%20through%20network%20traffic%20inspection.) se sugiere consultar esta guia para más información [this handbook](https://pages.apigee.com/rs/apigee/images/api-design-ebook-2012-03.pdf).

Se detalla en este archivo [YALM file](./design/API/spec.yml) el cual fue editado en  [Swagger Editor](https://editor.swagger.io/#).


A continuación un breve resumen de los endpoints.

*Base URL*: localhost:3000/api/v1
| Method |       Enpoint      |                  Description                  |
|--------|--------------------|-----------------------------------------------|
|   GET  | /login             | Retorna el token bearer                       |
|   GET  | /users             | Trae la información de usuario                |
|  POST  | /users             | Crea un nuevo usuario                         |
|   GET  | /users/{id}        | Consigue usuario por id                       |
|   PUT  | /users/{id}        | Edita la información del usuario              |
| DELETE | /users/{id}        | Elimina un usuario por id                     |
|   GET  | /users/{id}/dishes | Trae los platos favoritos por usuario         |
|   GET  | /dishes            | Trae toda la informacion de los platos        |
|  POST  | /dishes            | Crea nuevos platos                            |
|   GET  | /dishes/{id}       | Trae información de platos por id             |
|   PUT  | /dishes/{id}       | Edita información plato                       |
| DELETE | /dishes/{id}       | Elimina un plato                              |
|   GET  | /orders            | Trae todas las ordenes de platos              |
|  POST  | /orders            | Crea una nueva orden                          |
|   GET  | /orders/{id}       | Trae la información de la orden               |
|   PUT  | /orders/{id}       | Actualiza el estado de la orden               |
|DELETE  | /orders/{id}       | Elimina la orden                              |

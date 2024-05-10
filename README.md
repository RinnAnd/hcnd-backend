# Iniciar parte backend del challenge

## Crear archivo .env
Es importante añadir las variables de entorno para la conexión a la base de datos, se debe hacer tal y como se ve en el archivo `.env.example`
```.env
PORT=3000
PG_USER=
PG_PASSWORD=
PG_HOST=
PG_PORT=
PG_DATABASE=haciendola

SECRET_KEY=S3cr3tK3y123!
```
Es necesario tener estos datos para conectarse a una base de datos Postgres.
Recomiendo conservar el PORT en el 3000 para que las peticiones del frontend se conecten correctamente al servidor.
Cualquier nombre de base de datos existente funciona, haciendola es un ejemplo y es como yo la creé.

## Ejecutar backend en Nest.js
Debes ubicarte en la dirección root de el proyecto en la terminal y correr el comando `npm install` para instalar las dependencias. Luego correr el comando `npm start` o `npm run start:dev` para modo --watch o desarrollo.

## Agregar productos del archivo .xlsx
Una vez iniciado y funcionando correctamente, podemos ir al endpoint `http://localhost:3000/excel` para agregar los productos en el archivo de excel.

La configuración es agregar un archivo en el Form-data en Postman o en el Form en Thunder Client con la key `file` y el archivo proporcionado para la prueba. Lo dejo en el directorio `src/test-file`.

Una vez teniendo el archivo cargado se ejecuta una petición `POST` y esto debería subir todos los productos a la tabla products.

Se puede verificar haciendo una petición `GET` al endpoint `http://localhost:3000/product`

Teniendo esto terminado se puede concluir el setup del backend del desafío.

## Otras posibles peticiones
Todas las peticiones de edición a productos requieren un JWT sin expirar para funcionar, estas son las que no lo requieren.

`GET` a `http://localhost:3000/product/:id`

Para retornar un producto en específico.


`GET` a `http://localhost:3000/user`

Para obtener una lista de todos los usuarios registrados.

`GET` a `http://localhost:3000/user/:id`

Para visualizar un usuario en específico usando su ID.

`POST` a `http://localhost:3000/user`

`Example body:`
```json
{
  "name": "Andrés",
  "email": "andre.ksas@gmail.com",
  "password": "password"
}
```
Para registrar un usuario que puedes usar desde el front.

`DELETE` a `http://localhost:3000/user/:id`

Para eliminar un usuario en específico usando su ID.
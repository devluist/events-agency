
# Tools
- Node version 16
- npm
- Nestjs
- Prisma ORM
- Argon
- Validation Pipes (class-validator, class-transformer)
- DotEnv
- JWT


### Folder Distribution

There are 2 projects:
- REST API made with nestjs
- the database backup script inside `./db_backups` folder

- DB schema is defined at `./prisma/schema.prisma`


### Missing task

It was requested to upload the backup into a storage, since I don't have an account for any known storage providers (AWS, Digital Ocean CDN, etc..) I only complete that the sript could store the backup files inside a folder.

Also there is a function in `./db_backups/backupHandler.js:sendToBackupServer()` that it might work for that upload phase, but it requires testing. That in theory, should be enough to upload the backup generated into a CDN.


## Installation

```bash
## nestjs app
npm install
cp .env.example .env

## db backup script
cd db_backups
cp .env.example .env
```

## Running the nest app

```bash
docker-compose up -d
npx prisma migrate dev
npm run start
```

## Running the node backup script

```bash
cd db_bakcups
node index.js
```

## Endpoints

* DOCUMENTATION localhost:4000/docs


- POST localhost:4000/auth/register
```
{
    "email": "aaa@bbb.com",
    "password": "1234"
}
```

- POST localhost:4000/auth/login

```
{
    "email": "aaa@bbb.com",
    "password": "1234"
}
```

// copy paste access_token to create and list a Event

- POST localhost:4000/events

```
{
    "name": "Event Prueba 1",
    "address": "abajo y a la izquierda con calle abajo",
    "datetime": "2022-11-05T11:28:50Z"
}
```

- GET localhost:4000/events

- GET localhost:4000/events?skip=0&take=10

```
    // TODO: this simplistic pagination has to be improved on the result, in "links" object section

    // also rename skip and take to be concise with page analogy
    
    // also remove user password from results
```

## Notes

- By default the jwt tokens last 15 min to expire



# Requirements

Una agencia de festejos desea realizar una app para gestionar pedidos de sus clientes, los requerimientos son los siguientes: 

●	Se desea guardar los datos del cliente (email, password), desde un servicio

●	El cliente puede iniciar sesión en un servicio

●	El cliente puede realizar solicitud de un evento indicando, dirección, fecha y hora

●	Desde un servicio poder listar las solicitudes de eventos (que indiquen los datos del usuario y de la solicitud del evento) con paginación 

●	Realizar un script que realice respaldos de una base de datos cada noche y suba este archivo a un storage 

●	El formato del archivo debe ser: `${nombre_del_proyecto}-${base_de_datos}-${fecha_formato(YYYYMMDD.HHMMSS => 20201231.235900)}.${ext}`

●	Las variables de conexión a la base de datos debe ser pasadas por variables de entorno 

●	En el storage sólo deben estar máximo 15 respaldos, se deben ir eliminando desde el más antiguo cada vez que suba uno nuevo 

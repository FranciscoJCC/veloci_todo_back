<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Description

Prueba técnica - Veloci Motors

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Componentes

- **Schemas**: Definen la estructura de los datos que se almacenan y se validan en la aplicación.
- **DTOs (Data Transfer Objects)**: Objetos que se utilizan para transferir datos entre diferentes partes de la aplicación.
- **Entities**: Representaciones de las tablas de la base de datos en forma de clases.
- **Controllers**: Manejan las solicitudes HTTP y delegan la lógica de negocio a los servicios.
- **Services**: Contienen la lógica de negocio y se comunican con los repositorios para acceder a los datos.

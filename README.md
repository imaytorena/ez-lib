# EASY-LIBBRARY

## Requerimientos
- php 8.0^
- composer
- node 12.0^ + npm


## Tecnologías usadas

- [Expo + React Native](https://expo.dev/)
- [Laravel](https://laravel.com)
- [React](https://reactjs.org/)

## Consultar proyecto instalado

### Backend
http://api.easylibrary.site/api

### Frontend
http://api.easylibrary.site:8080/login
|  |  |
| ------ | ------ |
| usuario | admin@admin.com |
| contraseña | passwordezlib1234 |

## Rutas principales
| Módulo | Frontend | Backend |
| ------ | ------ | ------ |
| Libros | [/books](http://api.easylibrary.site:8080/books) | [/api/books](http://api.easylibrary.site/api/books)
| Usuarios | [/users](http://api.easylibrary.site:8080/users) | [/api/users](http://api.easylibrary.site/api/users)
| Materiales | [/materials](http://api.easylibrary.site:8080/materials) | [/api/materials](http://api.easylibrary.site/api/materials)
| Reportes | [/reports](http://api.easylibrary.site:8080/reports) | [/api/reports](http://api.easylibrary.site/api/reports)
| Prestamos | [/loans](http://api.easylibrary.site:8080/loans) | [/api/loans](http://api.easylibrary.site/api/loans)

## Pasos para instalar e iniciar proyecto
### Instalar backend
Instalar laravel 9 de acuerdo a la documentación:
https://laravel.com/docs/4.2/installation

Crear una base de datos en mysql de acuerdo a las configuraciones del .env.example 
Copiar las configuraciones del .env.example en un archivo .env
```sh
cd api
cp .env.example .env
```

Instalar las dependencias de php/laravel y despues instalar los módulos a usar
```sh
composer install
php artisan migrate --seed
php artisan serve
```


### Instalar fronted

Instalar las dependencias
```sh
cd frontend
npm install
```

Levantar el proyecto
```sh
npm run dev
```


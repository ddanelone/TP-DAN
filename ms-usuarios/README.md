# Gestión de usuarios

## Resumen

Desarrollar una aplicación para la gestión de usuarios de una aplicación web.

La comunicación con la aplicación se deberá realizar a través de una API REST (HTTP).
La aplicación persistirá los datos, de forma que si se para todos los cambios deberán permanecer guardados

## Definición de entidades

-   **Usuario**: Usuario registrado en la plataforma, todos los campos son obligatorios.
    -   Nombre: Mínimo de 2 caracteres y un máximo 20 (Todos los caracteres serán válidos)
    -   Apellidos: Mínimo de 4 y máximo de 50 (Todos los caracteres serán válidos)
    -   Email: Deberá cumplir el [RFC 5322](https://www.ietf.org/rfc/rfc5322.txt)
    -   Contraseña: Mínimo de 10 caracteres y máximo de 25 (Al menos una minúscula, mayúscula y un número)
    -   Role: 0 (cliente) 1 (vendedor)

## Requisitos funcionales

-   El usuario podrá registrarse en la aplicación, introduciendo los datos necesarios.
    -   El email debe ser único por cada usuario.
-   El usuario podrá autenticarse ante la aplicación utilizando su email y contraseña.
    -   Si la autenticación es válida, la aplicación le devolverá al usuario un identificador que le servirá para demostrar su identidad ante la aplicación cuando quiera cambiar/eliminar sus datos.
-   El usuario podrá obtener todos sus datos exceptuando su contraseña, utilizando su identificador.
-   El usuario podrá actualizar su nombre y apellidos, será necesario el identificador.
-   El usuario podrá actualizar su email, será necesario el identificador y la contraseña actual.
-   El usuario podrá actualizar su contraseña, será necesario el identificador y la contraseña actual.
-   El usuario podrá eliminar todos sus datos de la plataforma, será necesario el identificador y la contraseña actual.
-   El usuario con Role de vendedor puede listar todos los usuarios y buscar uno por id

## Instalación

-   La aplicación deberá poderse ejecutar a partir de la versión LTS de Node.JS(16).
-   Hay que tener instalado npm también. Ejecutar npm install --force
-   Se puede utilizar cualquier base de datos relacional, pero está configurada con postgresql.
-   No probé si crea la Base de Datos, pero la tabla Usuarios sí la crea.

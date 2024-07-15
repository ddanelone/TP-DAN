# tp-dan-2024# TP-DAN

# RAMA A CLONAR: HAPROXY

1. Levantar el microservicio de RabittQM
2. Levantar el config-service (tiene las configuraciones remotas de los demás MS)
3. eureka-service porque tiene que registrar a los demás microservicios
4. gateway-service, es el proxy
5. Levantar también: graylog y prometheus
6. resto de los microservicios
7. para ejecutar el frontend, instalar previamente node.js;

8. instalado node, en la carpeta del frontend, ejecutar npm i
9. si alguna depenencia no se instala, npm i --force
10. crear el contenedor del frontend; acceder: http://localhost (a través de Haproxy)
11. sufra con gusto.

# EUREKA (MS registrados por el Discovery)

localhost:8761

# RABBITMQ (mensajería)

localhost:15672
usuario: guest
password: guest

# ZIPKIN (observabilidad: trazas)

localhost:9411

# PROMETHEUS

localhost:9090

# NODE EXPORTER

localhost: 9100

# GRAFANA

localhost:3030
Contraseña y usuario por default: admin admin

# JACOCO

Ejecutar mvn clean test en el ms-clientes y se crea la carpeta correspondiente /target/site
Desde el explorador de archivos, entrar al index.html

# TEST IMPLEMENTADOS

1. TestContainer mySQL en:

   - ClienteRepository
   - ObraRepository
   - UsuarioHabilitadoRepository

2. Pruebas Unitarias

   - ClienteService
   - ObraService
   - UsuarioHabilitadoService

3. Pruebas de Integración

   - 3.1 Con MockMvc
     -- ClienteController
     -- ObraController
     -- UsuarioHabilitadoController

     -- ProductoController

   - 3.2 Con RestControllerTest
     -- ClienteController
     -- ObraController
     -- UsuarioHabilitadoController

# GRAYLOG

http://localhost:9800/system/overview
usuario: admin
password: nuestroTPesLaMeraVerga

En System/Overview --> input --> GELF UDP --Launch new input --> poner nombre. Darle play para que actualice automaticamente.
Voilà!

# HAPROXY

http://localhost:70
user: user
pass: pass

# Para ejecutar el Frontend:

http://localhost/

# Patrones: Short Circuit & Retry

Implementados en MS Pedidos.

# JWT

Sólo lo implementamos para el ms-usuarios-svc (Node.js): el inicio de sesión (dura una semana el token) se almacena en el localStorage. Si no se encuentra, la protección de rutas solo te permite navegar en el login / register de los usuarios.
Las peticiones desde el cliente llevan el token en el encabezado, por sí luego lo implementamos en el gateway.

# COORDENADAS DE LAS OBRAS

Agregamos más campos para poder organizar adecuadamente la dirección de una obra. La consulta se hace armando una petición GET al sitio:

"https://nominatim.openstreetmap.org/search" que devuelve un objeto con información, entre ellas, las coordenadas. Así, cuando se da de alta una obra, sólo se ingresa el domicilio (calle, altura, ciudad, provincia, pais -se carga por omisión Argentina) y la petición busca las coordenadas automáticamente.

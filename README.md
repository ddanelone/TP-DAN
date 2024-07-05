|# tp-dan-2024# TP-DAN

# RAMA A CLONAR: ZIPKIN

1. Levantar el ms-docker que es el microservicio de RabittQM
2. Levantar el config-service (tiene las configuraciones remotas de los demás MS)
3. eureka-service porque tiene que registrar a los demás microservicios
4. gateway-service, es el proxy
5. Levantar también: graylog y prometheus
6. resto de los microservicios
7. para ejecutar el frontend, instalar previamente node.js

8) instalado node, en la carpeta del frontend, ejecutar npm i
9) si alguna depenencia no se instala, npm i --force
10) npm run dev para transpilar el código y levantar el servidor en el puerto 3000
11) sufra con gusto.

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

   - 3.1 Con WebMvcTest
     -- ClienteController
     -- ObraController
     -- UsuarioHabilitadoController

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

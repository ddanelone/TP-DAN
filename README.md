# tp-dan-2024# TP-DAN

# RAMA A CLONAR: MAIN

# Crear la red backend-net --> docker network create backend-net

1. Levantar los microservicios de RabittQM / Zipkin ---> Recomendado, para que no tire errores en el log
   Opcional: levantar Graylog y Prometheus
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

# SPRING SECURITY ---> OBSERVACIÓN: hay un ms de usuarios no dockerizado en Java.

Fue armado al final, sólo para probar cómo funciona Spring Security. Corre en el localhost sin problemas. Tener en cuenta que funciona a la "antigüita: necesita postgresql funcionando en el equipo y hay que crear la base de datos.

# 4° MICROSERVICIO IMPLEMENTADO

ms-usuarios-svc en Node.js --> desde el "Crear cuenta" se crea un usuario con status de "Vendedor". Quedó así porque es razonable tener la posibilidad de autogestionar algún tipo de usuario que sea capaz de crear Clientes. No tiene demasiado sentido en la vida real, pero es práctico para el TP, dado que no tenemos una interfaz para administrar los usuarios (sí los clientes y, por supuesto, cada usuario puede actualizar su Profile, claro).

# CREACIÓN DE "CLIENTES"

Al darse de alta un "Cliente", el ms-clientes le envía un mensaje a la cola RabbitMQ que luego consume el ms-Usuarios, creando un nuevo usuario. La clave creada por omisión es:

- primer letra del nombre, en mayúsculas;

- primer letra del apellido, en minúsculas,

- y el número de Documento.

Así, el usuario "Juan Pérez, DNI 12345678", tendrá como clave: "Jp12345678"
Se puede cambiar en el menú correspondiente.

# CREACION DE "USUARIOS HABILITADOS"

Se crea un usuario nuevo, igual que el caso anterior de alta de "Clientes".

# EUREKA (MS registrados por el Discovery)

localhost:8761

# RABBITMQ (mensajería)

localhost:15672
usuario: guest
password: guest

# ZIPKIN (observabilidad: trazas)

localhost:9411

# PROMETHEUS /TELEMETRIA: en todos los MS Java

localhost:9090

# I M P O R T A N T E # I M P O R T A N T E # I M P O R T A N T E # I M P O R T A N T E # I M P O R T A N T E

Actualizar el token en el prometheus.yml porque tiene vigencia 7 días (hasta el 27/08/2024 inclusive)

Para verlo en actuator:
http://localhost:8080/actuator/prometheus

# NODE EXPORTER

localhost: 9100

# GRAFANA

localhost:3030
Contraseña y usuario por default: admin admin

# JACOCO (en los 3 microservicios Java)

Ejecutar mvn clean test en el ms-clientes y se creará la carpeta correspondiente /target/site
Desde el explorador de archivos, entrar al index.html

# SUREFIRE (en los 3 microservicios Java)

En los microservicios de Clientes y Productos: /target/surefire-reports

# SWAGGER (en los 3 microservicios Java)

En el microservicio de Clientes.

http://localhost:8080/swagger-ui/index.html

# En el microservicio de Pedidos.

# http://localhost:8080/swagger-ui/index.html

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

     -- PedidosController

   - 3.2 Con RestControllerTest
     -- ClienteController
     -- ObraController
     -- UsuarioHabilitadoController

   - 3.3 Con MockRestServiceServe
     -- ClienteController

# GRAYLOG (en los 3 microservicios Java)

http://localhost:9800/system/overview
usuario: admin
password: nuestroTPesLaMeraVerga

En System/Overview --> input --> GELF UDP --Launch new input --> poner nombre. Darle play para que actualice automaticamente.
Voilà!

# Patrones: Short Circuit & Retry

Implementados en MS Pedidos.

# JWT PARA LA CREACIÓN DE SESION

Lo genera ms-usuarios-svc (Node.js): el inicio de sesión (dura una semana el token) se almacena en el localStorage. Si no se encuentra, la protección de rutas solo te permite navegar en el login / register de los usuarios.
Las peticiones desde el cliente.

# JWT PARA LA PROTECCIÓN DE RUTAS

Se utilizó Aspect para ello. El token generado en ms-usuarios es validado antes de atender las peticiones.

# AOP

Implementado en los ms-pedidos, ms-productos y ms-clientes, para la protección de rutas con JWT.

# COORDENADAS DE LAS OBRAS

Agregamos más campos para poder organizar adecuadamente la dirección de una obra. La consulta se hace armando una petición GET al sitio:

"https://nominatim.openstreetmap.org/search" que devuelve un objeto con información, entre ellas, las coordenadas. Así, cuando se da de alta una obra, sólo se ingresa el domicilio (calle, altura, ciudad, provincia, pais -se carga por omisión Argentina) y la petición busca las coordenadas automáticamente.

# HAPROXY

http://localhost:70
user: user
pass: pass

# Para ejecutar el Frontend:

http://localhost/

# INFINIT SCROLL EN EL FRONTEND Y "PAGEABLE" (BUENO, PEIYEJEABEL) EN JAVA (MS-PRODUCTOS).

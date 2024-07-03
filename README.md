|# tp-dan-2024# TP-DAN

# RAMA A CLONAR: ZIPKIN

1. Levantar el ms-docker que es el microservicio de RabittQM
2. Levantar el config-service (tiene las configuraciones remotas de los demás MS)
3. eureka-service porque tiene que registrar a los demás microservicios
4. gateway-service, es el proxy
5. resto de los microservicios
6. para ejecutar el frontend, instalar previamente node.js

7) instalado node, en la carpeta del frontend, ejecutar npm i
8) si alguna depenencia no se instala, npm i --force
9) npm run dev para transpilar el código y levantar el servidor en el puerto 3000
10) sufra con gusto.

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

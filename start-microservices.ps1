# Script de Despliegue - TP-DAN 2024
# Autor: Diego F. Danelone

Write-Host "🚀 Iniciando orquestación de Microservicios..." -ForegroundColor Cyan

# 1. Creación de la red
Write-Host "🌐 Configurando red backend-net..."
docker network create backend-net 2>$null

# 2. Infraestructura Base
Write-Host "📦 Levantando Infraestructura (RabbitMQ, Zipkin, Databases)..."
docker-compose -f docker-compose-infra.yml up -d

Write-Host "⏳ Esperando a que RabbitMQ esté listo (20s)..."
Start-Sleep -Seconds 20

# 3. Config Service (El cerebro de la config remota)
Write-Host "⚙️ Iniciando Config-Service..."
cd config-service; mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=8888"; cd ..
Start-Sleep -Seconds 15

# 4. Eureka Service (Service Discovery)
Write-Host "🔍 Iniciando Eureka-Service..."
cd eureka-service; mvn spring-boot:run; cd ..
Start-Sleep -Seconds 15

# 5. Gateway Service (Proxy)
Write-Host "🛡️ Iniciando Gateway-Service..."
cd gateway-service; mvn spring-boot:run; cd ..

# 6. Observabilidad
Write-Host "📊 Levantando Prometheus y Graylog..."
docker-compose -f docker-compose-observability.yml up -d

# 7. Microservicios de Negocio
Write-Host "💼 Levantando Microservicios de Negocio..."
$services = @("ms-clientes", "ms-productos", "ms-pedidos")
foreach ($s in $services) {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd $s; mvn spring-boot:run"
}

# 8. Microservicio de Usuarios (Node.js)
Write-Host "🔑 Iniciando ms-usuarios-svc (Node.js)..."
cd ms-usuarios-svc; npm start; cd ..

# 9. Frontend (Next.js)
Write-Host "💻 Iniciando Frontend Next.js..."
cd frontend; npm run dev; cd ..

Write-Host "✅ Todo el ecosistema está en marcha. ¡Sufra con gusto!" -ForegroundColor Green
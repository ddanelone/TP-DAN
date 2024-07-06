# Etapa de construcción
FROM node:18-alpine AS build

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm ci

# Copiar el resto del código
COPY . .

# Limpiar la caché de npm y borrar la carpeta de compilación anterior
RUN npm cache clean --force
RUN rm -rf .next

# Construir la aplicación
RUN npm run build

# Etapa de runtime
FROM node:18-alpine AS runtime

WORKDIR /app

# Copiar las dependencias de producción
COPY package*.json ./
RUN npm ci --only=production

# Copiar el código compilado y los archivos públicos
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

EXPOSE 3000

USER node

CMD ["npm", "start"]

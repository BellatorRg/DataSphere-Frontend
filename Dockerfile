# José Raúl Guerrero Parra
# Dockerfile para construir y servir el frontend React

# Construcción del frontend con Node.js
FROM node:22-alpine AS build
WORKDIR /app
# Copiamos los archivos de dependencias
COPY package*.json ./
# Instalamos las dependencias del proyecto
RUN npm ci
# Copiamos el código fuente
COPY . .

# Configuración del frontend para la compilación
ARG VITE_API_URL=/backend
ARG VITE_ENVIRONMENT_NAME=production
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_ENVIRONMENT_NAME=$VITE_ENVIRONMENT_NAME
# Generamos los archivos estáticos de React
RUN npm run build

# Servidor web Nginx:
FROM nginx:alpine
# Copiamos los archivos compilados a Nginx y a la API
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Puerto HTTP del contenedor
EXPOSE 80

# Iniciamos Nginx
CMD ["nginx", "-g", "daemon off;"]

FROM node:18
WORKDIR /app

# Устанавливаем права на запись в папку public
RUN mkdir -p /app/public && chmod -R 777 /app/public

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы (кроме public)
COPY .env ./
COPY src/ ./src/
COPY server.js ./

# Открываем порт
EXPOSE 5000

# Запускаем приложение
CMD ["node", "server.js"]
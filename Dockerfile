# Use uma imagem base do Node.js
FROM node:18

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos do projeto
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

# Instale as dependências
# Compile o TypeScript
RUN npm install && \
    npm run build

# Exponha a porta
EXPOSE 3000

# Execute as migrações e inicie o aplicativo
CMD ["sh", "-c", "npm start"]

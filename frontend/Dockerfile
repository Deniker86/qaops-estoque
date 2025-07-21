# Usa imagem oficial com Node.js e npm
FROM node:18-alpine

# Define diretório de trabalho dentro do container
WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante da aplicação
COPY . .

# Expõe a porta usada pelo React
EXPOSE 3000

# Comando para iniciar o frontend
CMD ["npm", "start"]
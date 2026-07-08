FROM node:22-alpine

# O Prisma requer o OpenSSL para rodar no Alpine Linux
RUN apk add --no-cache openssl

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia os arquivos de gerenciamento de pacotes primeiro
# Isso otimiza o cache do Docker, evitando reinstalar pacotes se o código mudar, mas as dependências não
COPY package*.json ./

# Copia o schema do Prisma e o arquivo de configuração
COPY prisma ./prisma/

# Instala as dependências via npm
RUN npm install

# Adicione esta linha para satisfazer a validação do schema do prisma durante o build
ENV DATABASE_URL="mysql://dummy:dummy@localhost:3306/dummy"

# Gera o Prisma Client
RUN npx prisma generate

# Copia todo o restante do código fonte do projeto
COPY . .

# ---------------------------------------------------
# PASSO DE PRODUÇÃO 1: Compilar o código TypeScript
# Isso vai gerar a pasta 'dist' contendo o JavaScript otimizado
# ---------------------------------------------------
RUN npm run build

# Expõe a porta definida para a API do seu microsserviço
EXPOSE 3002

# ---------------------------------------------------
# PASSO DE PRODUÇÃO 2: Rodar o JavaScript puro
# Mais rápido, mais seguro e consome menos memória RAM
# ---------------------------------------------------
CMD ["node", "dist/src/main"]


# # -----------------------------
# # BUILD STAGE
# # -----------------------------
# FROM node:20-alpine AS build

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# RUN npm run build

# # -----------------------------
# # RUN STAGE
# # -----------------------------
# FROM node:20-alpine

# WORKDIR /app

# COPY package*.json ./
# RUN npm install --only=production

# COPY --from=build /app/dist ./dist

# EXPOSE 3002

# CMD ["node", "dist/main"]
# -----------------------------
# BUILD STAGE
# -----------------------------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
# Copia a pasta do prisma no build para gerar o client inicial
COPY prisma ./prisma/ 

RUN npm install

COPY . .
RUN npm run build

# -----------------------------
# RUN STAGE
# -----------------------------
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
# Copia a pasta do prisma também para o estágio de execução
COPY prisma ./prisma/ 

# Instala as dependências de produção e gera o Prisma Client para o Alpine
RUN npm install --only=production && npx prisma generate

# Copia o código compilado do estágio de build
COPY --from=build /app/dist ./dist

EXPOSE 3002

# Se quiser que ele aplique as migrations automaticamente ao subir o container:
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]




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
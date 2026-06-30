# -----------------------------
# BUILD STAGE
# -----------------------------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# -----------------------------
# RUN STAGE
# -----------------------------
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=build /app/dist ./dist

EXPOSE 3002

CMD ["node", "dist/main"]
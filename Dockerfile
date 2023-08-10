FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN pnpm

COPY . .

CMD ["pnpm", "start"]

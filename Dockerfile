FROM node:18-alpine

RUN npm i -g pnpm

WORKDIR /usr/src/app

COPY package*.json ./

RUN pnpm

COPY . .

CMD ["pnpm", "start"]

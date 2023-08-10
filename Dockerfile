FROM node:18-alpine

RUN npm i -g pnpm

WORKDIR /usr/src/app

COPY package*.json ./

RUN pnpm i

COPY . .

CMD ["pnpm", "start"]

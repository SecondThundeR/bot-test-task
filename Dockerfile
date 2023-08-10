FROM node:18-alpine

RUN npm i -g pnpm

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

CMD ["pnpm", "start"]

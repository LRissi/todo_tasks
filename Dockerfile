FROM node:15.14.0-alpine AS build

RUN apk add --no-cache \
  build-base \
  gcc \
  g++ \
  make

RUN mkdir -p /app

WORKDIR /app

COPY package.json .

RUN npm install
RUN npm install -g ts-node

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
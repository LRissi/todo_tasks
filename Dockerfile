FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install -g npm@8
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD npm start
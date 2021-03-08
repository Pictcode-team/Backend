FROM node:lts as deps

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

CMD npm run dev
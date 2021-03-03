FROM node:lts as deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 
COPY . .

CMD npm run dev
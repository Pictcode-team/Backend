FROM node:lts as deps
WORKDIR /srv
COPY package*.json ./
RUN npm install 

FROM node:lts as release
WORKDIR /srv
COPY --from=deps /srv/node_modules ./node_modules
COPY . .

EXPOSE 1337
RUN npm run dev
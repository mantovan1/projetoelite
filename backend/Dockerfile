FROM node:16.13

ENV PORT 8080

RUN apt-get update

RUN npm install -g nodemon
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE $NODE_PORT
CMD ["nodemon", "server.js"]

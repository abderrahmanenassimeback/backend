FROM node:18
RUN npm install -g pm2
WORKDIR /usr/app/backend
COPY package.json .
RUN npm install --quiet
COPY . .
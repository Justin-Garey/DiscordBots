FROM node:alpine as build
WORKDIR /DockerBot
COPY ./DockerBot /DockerBot
RUN npm install
CMD node index.js

FROM node:14-alpine

MAINTAINER George Makeyev

RUN mkdir /app
WORKDIR /app

COPY ../untitled/package.json /app

RUN npm install --production

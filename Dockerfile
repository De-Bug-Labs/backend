FROM node:12

RUN mkdir -p /usr/src/app

COPY . /usr/src/app

EXPOSE 5000

ENTRYPOINT [ "dist/server.js" ]
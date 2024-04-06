FROM node:19.8.1-alpine

RUN apk add --no-cache sudo

COPY run.sh /tmp/run/run.sh
COPY server.js /tmp/server.js
COPY data.sqlite /root/data.sqlite

FROM nginx:1.19.4-alpine

COPY build/ /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
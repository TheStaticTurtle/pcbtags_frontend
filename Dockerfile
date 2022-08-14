FROM node:lts-alpine
MAINTAINER TheStaticTurtle <samuel@thestaticturtle.fr>

# set the working direction
WORKDIR /app

# Copy app
COPY . ./

# Install deps and build
RUN npm install
RUN npm run build

# Install ngnix & copy config
RUN apk add --no-cache nginx
COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /data

CMD ["nginx", "-c", "/etc/nginx/nginx.conf", "-g", "daemon off;"]

EXPOSE 80
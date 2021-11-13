FROM node:12
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app

RUN npm install

COPY . /app

EXPOSE 8000

CMD npm run build && npm run pretypeorm && npm run migration:up && npm run start:prod
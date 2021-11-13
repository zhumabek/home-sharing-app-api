FROM node:12
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app

RUN npm install

#for storing static files
RUN mkdir -p /app/static

COPY . .

EXPOSE 8000

CMD npm run build && npm run pretypeorm && npm run migration:up && npm run start:prod
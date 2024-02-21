FROM node:21

WORKDIR /usr/src/app

COPY ../package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

# generates the prisma client at build time
RUN npx prisma generate --schema=./src/prisma/schema.prisma

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
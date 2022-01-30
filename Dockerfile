FROM node:latest as nodejs

WORKDIR /usr/src/webapp
COPY package.json .
COPY package-lock.json .
RUN npm i --production
COPY dist .

EXPOSE 5000
CMD ["npm", "run", "start"]
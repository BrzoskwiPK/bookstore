FROM node:latest

WORKDIR /app

COPY package.json ./

RUN npm install 

COPY . .

EXPOSE 3001 3002 3003 3004 3005

CMD ["npm", "start"]
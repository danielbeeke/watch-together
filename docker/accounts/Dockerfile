FROM node:8
WORKDIR /var/www/vhosts/nf2g/public
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "npm", "start" ]


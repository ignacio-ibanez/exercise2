FROM node
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
RUN npm install jquery bootstrap@3 angular angular-route angular-ui-bootstrap
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]
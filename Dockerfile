FROM node:14

WORKDIR /Users/clicks/Documents/Apps/gupshup-bot

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY . .

EXPOSE 8080
CMD [ "node", "./node_modules/gupshup-local-botrunner/index.js" ]
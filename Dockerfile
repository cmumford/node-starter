FROM node:lts-alpine
ENV NODE_ENV=production
ENV GIT_COMMIT_ID=dev
WORKDIR /usr/src/node-starter
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 80
RUN chown -R node /usr/src/node-starter
USER node
CMD ["npm", "start"]
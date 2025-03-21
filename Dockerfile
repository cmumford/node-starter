FROM node:lts-alpine
ARG GIT_SHA1=prod
ENV NODE_ENV=production
ENV GIT_COMMIT_ID=$GIT_SHA1
ENV PORT=80
WORKDIR /usr/src/node-starter
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 80
RUN chown -R node /usr/src/node-starter
USER node
CMD ["npm", "start"]
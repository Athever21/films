FROM node:16
WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn
COPY . .
RUN yarn prisma generate
CMD yarn start
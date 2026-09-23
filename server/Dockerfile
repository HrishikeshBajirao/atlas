FROM node:22-alpine
WORKDIR /backend
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npm", "start"]
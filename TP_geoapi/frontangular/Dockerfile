FROM node:18

WORKDIR /app

COPY geoapiview/package*.json ./
RUN npm install

COPY geoapiview/ ./

CMD ["npm", "run", "start"]

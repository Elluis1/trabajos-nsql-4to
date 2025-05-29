# FROM node:18 as builder
# WORKDIR /app
# COPY . .
# RUN npm install && npm run build

# FROM nginx:alpine
# COPY --from=builder /app/dist/spa-marvel-dc/browser /usr/share/nginx/html
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "run", "start"]

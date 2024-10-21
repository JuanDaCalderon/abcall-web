FROM node:20-alpine3.20 as dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install

FROM node:20-alpine3.20 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM nginx:alpine as prod
EXPOSE 80
COPY --from=builder /app/dist/abcall-web /usr/share/nginx/html
CMD ["nginx", "-g","daemon off;"]

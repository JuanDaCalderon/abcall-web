FROM node:20-alpine3.20 as dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx:alpine as prod
EXPOSE 80
COPY --from=dev-deps app/dist/abcall-web/browser /usr/share/nginx/html
COPY  ./nginx-custom.conf /etc/nginx/conf.d/default.conf

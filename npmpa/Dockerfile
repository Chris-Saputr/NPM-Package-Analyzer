# --- Production ---
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Run ---
FROM nginx:alpine

RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx \
    && touch /var/run/nginx.pid \
    && chown -R nginx:nginx /var/cache/nginx /var/run /var/log/nginx /var/run/nginx.pid
COPY --from=build /app/dist /usr/share/nginx/html
USER nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
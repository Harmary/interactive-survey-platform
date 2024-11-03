FROM node:20.12 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# Stage 2 - serve the app with Nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
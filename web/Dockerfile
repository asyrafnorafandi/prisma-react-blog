FROM node:14.17.5 as build

# Set workin directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install
COPY . .

# Build app
RUN npm run build

# Web server
FROM nginx:1.20-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html

FROM node:14.17.5 as build

# Set workin directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install
COPY . .

# Build app
RUN npx prisma generate
RUN npm run build

FROM node:14.17.5

# Set workin directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

# Copy the dist tree from the first stage.
COPY --from=build /usr/src/app/dist dist
COPY --from=build /usr/src/app/config config
COPY --from=build /usr/src/app/node_modules node_modules

CMD ["node", "dist/app.js"]

#use the official nodejs image for build the react app
FROM node:18 AS build

#set working directory
WORKDIR /app

#copy the package.json and install dependencies
COPY package.json ./
RUN npm install

#copy the rest of the app code
COPY . .

#build the react app
RUN npm run build

#serve the app with nginx(it is web server softwre copy all build files into it)
FROM nginx:alpine

#copy the build folder to the nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80




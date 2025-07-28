# Use an official Node.js image as the base image
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to install dependencies
COPY package*.json ./

# Install both frontend and backend dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Build frontend
WORKDIR /app/src
RUN npm run build

# Expose the port for the backend
EXPOSE 8080

# Set environment variables for the backend
ENV NODE_ENV=production
ENV PORT=8080
ENV MONGO_URI=mongodb://mongo:27017/db

# Start the backend server and serve the frontend build
CMD npm run start

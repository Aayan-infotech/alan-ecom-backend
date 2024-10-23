# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port your app runs on (assuming it's 3000, you can change it if different)
EXPOSE 5000

# Command to start your application
CMD ["node", "server.js"]

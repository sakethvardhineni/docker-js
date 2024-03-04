# Use the official Node.js image as the base
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY app.js ./
COPY index.js ./
COPY public ./public
COPY views ./views

# Copy the src folder into the container
COPY src ./src

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application with nodemon for development
CMD ["npx", "nodemon", "app.js"]
CMD ["npx", "nodemon", "index.js"]

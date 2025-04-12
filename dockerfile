# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json)
COPY package*.json ./

# Install dependencies with legacy peer deps
RUN npm install --legacy-peer-deps

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on (Next.js default is 3000)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
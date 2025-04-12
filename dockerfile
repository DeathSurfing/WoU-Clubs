FROM node:18-alpine

WORKDIR /app

# Copy package files first
COPY package.json package-lock.json ./

# Install all dependencies (dev and prod) with legacy peer deps
RUN npm install --legacy-peer-deps

# Copy the rest of the app
COPY . .

# Generate events data
RUN npm run fetch-events

# Build the app
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
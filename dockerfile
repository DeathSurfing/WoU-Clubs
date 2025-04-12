FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package.json package-lock.json ./

# Install dependencies with flags as requested
RUN npm install --legacy-peer-deps --force

# Copy all source files (except what's in .dockerignore)
COPY . .

# Build the Next.js app in production mode
ENV NODE_ENV=production
RUN npm run build

# Run the fetch-events script
RUN npm run fetch-events

# Expose the port for the Next.js app
EXPOSE 3030

# Start the Next.js app on port 3030
CMD ["npm", "start", "--", "-p", "3030"]
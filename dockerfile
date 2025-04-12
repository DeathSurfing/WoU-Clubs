FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps 

# Copy all source files (except what's in .dockerignore)
COPY . .

# Build the Next.js app in production mode
RUN npm run build

# Create a startup script
RUN echo '#!/bin/sh\nnpm run fetch-events\nexec npm start -- -p 3030' > /app/start.sh && \
    chmod +x /app/start.sh

# Expose the port for the Next.js app
EXPOSE 3030

# Use the startup script to run fetch-events first, then start the app
CMD ["/app/start.sh"]
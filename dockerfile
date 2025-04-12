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

# Create a startup script
RUN echo '#!/bin/sh\nnpm run fetch-events\nexec npm start -- -p 3030' > /app/start.sh && \
    chmod +x /app/start.sh

# Expose the port for the Next.js app
EXPOSE 3030

# Set environment variables at runtime via dockploy
ARG MONGODB_URI
ARG SHEET_ID
ARG GOOGLE_API_KEY
ARG RUN_ON_STARTUP
ENV MONGODB_URI=$MONGODB_URI
ENV SHEET_ID=$SHEET_ID
ENV GOOGLE_API_KEY=$GOOGLE_API_KEY
ENV RUN_ON_STARTUP=$RUN_ON_STARTUP
ENV NODE_ENV=production

# Use the startup script to run fetch-events first, then start the app
CMD ["/app/start.sh"]
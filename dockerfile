FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package.json package-lock.json ./

# Install dependencies with flags as requested
RUN npm install --legacy-peer-deps --force

# Copy all source files (except what's in .dockerignore)
COPY . .

# Use ARG to accept dockploy variables
ARG SHEET_ID
ARG GOOGLE_API_KEY
ARG DOMAIN
ARG EMAIL

# Set the variables as environment variables for the container
ENV SHEET_ID=$SHEET_ID
ENV GOOGLE_API_KEY=$GOOGLE_API_KEY
ENV DOMAIN=$DOMAIN
ENV EMAIL=$EMAIL

# Build the Next.js app in production mode
ENV NODE_ENV=production
RUN npm run build

# Run the fetch-events script with access to the environment variables
RUN npm run fetch-events

# Expose the port for the Next.js app
EXPOSE 3030

# Start the Next.js app on port 3030
CMD ["npm", "start", "--", "-p", "3030"]
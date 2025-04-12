# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Install system dependencies
RUN apk update && apk add --no-cache bash curl

# Copy package files first for caching
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Copy application files
COPY . .

# Build arguments
ARG MONGODB_URI
ARG SHEET_ID
ARG GOOGLE_API_KEY
ARG RUN_ON_STARTUP
ENV MONGODB_URI=$MONGODB_URI
ENV SHEET_ID=$SHEET_ID
ENV GOOGLE_API_KEY=$GOOGLE_API_KEY
ENV RUN_ON_STARTUP=$RUN_ON_STARTUP
ENV NODE_ENV=production

# Build the application
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

# Install runtime dependencies
RUN apk update && apk add --no-cache bash curl

# Copy built artifacts from builder
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/models ./models

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000 || exit 1

# Start the application
CMD ["npm", "start"]
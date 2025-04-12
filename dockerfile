# ----------- STAGE 1: Build ----------- #
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the app
COPY . .

# ✅ Generate data/events.ts from Google Sheets
RUN npm run fetch-events

# Build the Next.js app
RUN npm run build


# ----------- STAGE 2: Production ----------- #
FROM node:18-alpine AS runner

# Set NODE_ENV for production
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Only copy the built app and necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/data ./data  # Include generated events.ts

# Expose port
EXPOSE 3000

# Run the app
CMD ["npm", "start"]

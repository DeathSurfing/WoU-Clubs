# ----------- STAGE 1: Build ----------- #
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies with legacy peer deps
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

ENV NODE_ENV=production
WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/data ./data

# Install production dependencies with legacy peer deps
RUN npm ci --omit=dev --legacy-peer-deps

# Install any required system libraries (e.g., for Sharp)
RUN apk add --no-cache vips-dev

EXPOSE 3000

# Start Next.js server on all interfaces
CMD ["npm", "run", "start", "--", "-H", "0.0.0.0"]
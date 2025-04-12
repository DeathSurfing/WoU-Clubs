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

ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/data ./data 

EXPOSE 3000
CMD ["npm", "start"]

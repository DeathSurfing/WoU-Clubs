FROM node:18-alpine

WORKDIR /app

# 1. Copy package files first for better caching
COPY package.json package-lock.json ./

# 2. Install with maximum compatibility flags
RUN npm install --legacy-peer-deps --force --unsafe-perm

# 3. Copy all source files
COPY . .

# 4. Generate events data (continue even if this fails)
RUN npm run fetch-events || echo "Events generation failed - continuing anyway"

# 5. Build with development environment to ensure all deps are available
ENV NODE_ENV=development
RUN npm run build

# 6. Switch to production for runtime
ENV NODE_ENV=production

# 7. Explicitly use port 3030 in three places:
#    - In the EXPOSE directive
#    - In the Next.js startup command
#    - In the health check
EXPOSE 3030
HEALTHCHECK --interval=30s --timeout=5s \
  CMD curl -f http://localhost:3030/api/health || exit 1
CMD ["node", "--max-old-space-size=4096", "node_modules/.bin/next", "start", "-p", "3030"]
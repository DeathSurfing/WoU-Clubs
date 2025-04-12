# 1. Base image
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && corepack prepare pnpm@latest --activate

# 4. Install dependencies with legacy peer deps handling
RUN pnpm install --no-frozen-lockfile --force

# 5. Clean build cache and remove previous build if it exists
RUN rm -rf .next

# 6. Copy remaining app files
COPY . .

# 7. Build the app
RUN pnpm build

# 8. Set environment variables (if needed)
ENV NODE_ENV=production
ENV PORT=3000

# 9. Expose port
EXPOSE 3000

# 10. Start the app
CMD ["pnpm", "start"]

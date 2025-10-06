# syntax=docker/dockerfile:1.6
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
# Use npm ci for faster, reliable builds in CI
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Install all dependencies (including devDependencies) for building
RUN npm ci
COPY . .
# Build the Next.js application
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Create non-root user for security (matches your k8s securityContext)
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copy the standalone Next.js build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set proper ownership and permissions
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]

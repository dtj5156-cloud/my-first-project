# =========================
# Base image
# =========================
FROM node:24-alpine AS base
WORKDIR /app
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs && \
    chown -R nodejs:nodejs /app

# =========================
# Dependencies stage
# =========================
FROM base AS deps
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
RUN chown -R nodejs:nodejs /app

# =========================
# Production stage
# =========================
FROM node:24-alpine AS production
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs && \
    chown -R nodejs:nodejs /app

# Environment variables
ENV NODE_ENV=production \
    NODE_OPTIONS="--max-old-space-size=256 --no-warnings" \
    NPM_CONFIG_LOGLEVEL=silent

# Copy dependencies and app files
COPY --from=deps --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs . .

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "src/server.js"]
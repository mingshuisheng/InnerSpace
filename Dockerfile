# Use official node image as base
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy source files
COPY . .

# Build app
RUN pnpm run build

# Expose port 3000
EXPOSE 3000

# Start app
CMD ["pnpm", "start"]

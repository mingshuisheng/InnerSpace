# Use official node image as base
FROM node:alpine

RUN apk add --no-cache bash

# Set working directory
WORKDIR /app

# Copy source
COPY . .

# Install pnpm globally
RUN npm install -g pnpm

RUN pnpm config set registry http://registry.npmmirror.com


WORKDIR /app/back
RUN pnpm install

WORKDIR /app/front
RUN pnpm install

# Expose port 3000
EXPOSE 3000
#EXPOSE 8080

# Start app
ENTRYPOINT ["/bin/sh", "-c"]
CMD ["cd /app/back && pnpm start & cd /app/front && pnpm start"]

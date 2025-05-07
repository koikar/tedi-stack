# This file is moved to the root directory before building the image

# Base Bun image
FROM oven/bun:1 AS base

# Set production environment and all layer that inherit from it
ENV NODE_ENV=production
ENV PORT="8080"

# 🪲 Use the following environment variables to configure Sentry
ARG COMMIT_SHA
ENV COMMIT_SHA=$COMMIT_SHA

# 🔑 Set 1Password CLI authentication token and ENV variable
ARG OP_SERVICE_ACCOUNT_TOKEN
ENV OP_SERVICE_ACCOUNT_TOKEN=$OP_SERVICE_ACCOUNT_TOKEN

ARG OP_ENV
ENV OP_ENV=$OP_ENV

# 🔋 Install 1Password CLI dependencies and binary
RUN apt-get update && apt-get install -y curl unzip jq && apt-get clean

# 📋 Copy OP binary from 1Password CLI Docker image
COPY --from=1password/op:2 /usr/local/bin/op /usr/local/bin/op

# 🔋 Install all node_modules, including dev dependencies & peer-legacy-deps
FROM base AS deps

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Setup production-only dependencies
FROM base AS production-deps

# React router app lives here
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
COPY package.json bun.lock ./

# 🗑️ Remove development dependencies
RUN bun install --production

# 🚧 Build the app
FROM base AS build

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules

# Add application code
COPY . .

# Run type generation for react-router
RUN bun run typegen

# 🏗️ Mount the secret and set it as an environment variable and run the build
RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN \
    export SENTRY_AUTH_TOKEN=$(cat /run/secrets/SENTRY_AUTH_TOKEN) && \
    bun run build

# Finally, build the production image with minimal footprint
FROM base

WORKDIR /app

# Copy production dependencies
COPY --from=production-deps /app/node_modules /app/node_modules

# Copy build artifacts and necessary files
COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/app/components/ui/icons /app/app/components/ui/icons

COPY . .

# 🏁 Start the server
CMD ["bun", "run", "start"]

<div align="center">
  <h1>TEDI Stack</h1>
  <p><strong>T</strong>echnology · <strong>E</strong>ducation · <strong>D</strong>iversity · <strong>I</strong>nnovation</p>
  <p>
    <a href="https://opensource.org/licenses">
      <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License" />
    </a>
    <a href="https://github.com/koikar/tedi-stack/stargazers">
      <img src="https://img.shields.io/github/stars/koikar/tedi-stack" alt="GitHub Stars" />
    </a>
    <a href="https://github.com/koikar/tedi-stack/network/members">
      <img src="https://img.shields.io/github/forks/koikar/tedi-stack" alt="GitHub Forks" />
    </a>
  </p>
</div>

---

## 🚀 Introduction

**TEDI Stack** is an open-source, learn-in-public project that combines modern web technologies to create a powerful full-stack development environment. Built on the foundation of React Router v7 framework with Bun runtime and Hono server, this stack is designed to enable fast, efficient, and type-safe web application development.

> ⚠️ **Experimental Notice**: This project should be considered experimental as the combination of React Router v7 framework with Bun runtime and Hono server is not yet fully supported in all areas. Feel free to contribute, suggest improvements, or provide feedback!

## 🌟 Inspiration

This stack draws inspiration from several excellent projects:

- **[Epic Stack](https://github.com/epicweb-dev/epic-stack)** by Kent C. Dodds - The primary inspiration for TEDI Stack. Initially, I tried to create an example of the Epic Stack with Hono and Bun runtime but ran into several challenges, which led to the creation of TEDI Stack.

- **[Base Stack](https://github.com/forge-42/base-stack)** by Alem Tulzak - A great source of inspiration, particularly for the Hono server configuration and i18next integration.

## 🛠️ Key Technologies

| Technology | Description | Link |
|------------|-------------|------|
| ![React Router](https://img.shields.io/badge/-React%20Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white) | Full-featured framework for building web applications | [reactrouter.com](https://reactrouter.com) |
| ![Bun](https://img.shields.io/badge/-Bun-000000?style=flat-square&logo=bun&logoColor=white) | JavaScript runtime, bundler, test runner, and package manager | [bun.sh](https://bun.sh/) |
| ![Hono](https://img.shields.io/badge/-Hono-E36002?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTEyIDJjNS41MiAwIDEwIDQuNDggMTAgMTBzLTQuNDggMTAtMTAgMTBTMiAxNy41MiAyIDEyIDYuNDggMiAxMiAyem0wIDJjLTQuNDIgMC04IDMuNTgtOCA4czMuNTggOCA4IDggOC0zLjU4IDgtOC0zLjU4LTgtOC04em0zIDhoLTEuMjZ2Ni4yNkgxMVYxMkg5djYuMjZINi43NFYxMkg1di04aDEuNzR2NGgyVjRoMi41MnY0aDJWNEgxNXY4eiIvPjwvc3ZnPg==&logoColor=white) | Fast, lightweight web framework | [hono.dev](https://hono.dev) |
| ![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) | Utility-first CSS framework | [tailwindcss.com](https://tailwindcss.com) |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | Typed JavaScript | [typescriptlang.org](https://typescriptlang.org) |
| ![Zod](https://img.shields.io/badge/-Zod-3068B7?style=flat-square&logo=zod&logoColor=white) | TypeScript-first schema validation | [zod.dev](https://zod.dev/) |
| ![Biome](https://img.shields.io/badge/-Biome-60A5FA?style=flat-square&logo=biome&logoColor=white) | Formatter, linter, and more | [biomejs.dev](https://biomejs.dev) |
| ![i18next](https://img.shields.io/badge/-i18next-26A69A?style=flat-square&logo=i18next&logoColor=white) | Internationalization framework | [i18next.com](https://i18next.com/) |
| ![Fly.io](https://img.shields.io/badge/-Fly.io-8B5CF6?style=flat-square&logo=fly-dot-io&logoColor=white) | App deployment platform | [fly.io](https://fly.io) |
| ![1Password CLI](https://img.shields.io/badge/-1Password%20CLI-0094F5?style=flat-square&logo=1password&logoColor=white) | Secure environment variable management | [1password.com](https://1password.com) |
| ![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white) | Containerization platform | [docker.com](https://www.docker.com) |
| ![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github&logoColor=white) | Version control platform | [github.com](https://github.com) |
| ![Sentry](https://img.shields.io/badge/-Sentry-362D59?style=flat-square&logo=sentry&logoColor=white) | Error tracking | [sentry.io](https://sentry.io) |
| ![PostHog](https://img.shields.io/badge/-PostHog-000000?style=flat-square&logo=posthog&logoColor=white) | Product analytics platform | [posthog.com](https://posthog.com) |

## 📋 Features

- **React Router v7** - Full-featured framework capabilities with SSR
- **Bun Runtime** - Fast JavaScript runtime with built-in bundler
- **Hono Server** - Lightweight and efficient server for handling requests
- **TypeScript** - Type-safe code development
- **Tailwind CSS** - Utility-first styling approach
- **i18next** - Internationalization support
- **1Password Integration** - Secure environment variable management
- **Biome** - Modern formatter and linter
- **GitHub Actions** - CI/CD workflows for automated deployments
- **Fly.io Deployment** - Easy cloud deployment

## 📊 Analytics & Error Tracking

### Sentry Integration

TEDI Stack comes with Sentry integration for error tracking and performance monitoring. To enable Sentry:

1. Create a Sentry account and project at [sentry.io](https://sentry.io)
2. Add the following environment variables to your `.env` file:

```sh
# SENTRY
SENTRY_DSN="your-sentry-dsn"
SENTRY_AUTH_TOKEN="your-sentry-auth-token"
SENTRY_ORG="your-sentry-organization"
SENTRY_PROJECT="your-sentry-project-name"
```

Sentry will automatically capture errors and exceptions in both server and client environments when these environment variables are present.

### PostHog Integration

TEDI Stack includes PostHog for product analytics and user behavior tracking. To enable PostHog:

1. Create a PostHog account and project at [posthog.com](https://posthog.com)
2. Add the following environment variables to your `.env` file:

```sh
# POSTHOG
POSTHOG_API_KEY="your-posthog-api-key"
POSTHOG_API_ENDPOINT="your-posthog-api-endpoint" # Usually https://app.posthog.com or your self-hosted URL
```

The integration includes automatic page view tracking and supports identifying users for cohort analysis.

## 🚦 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- Optional: [1Password CLI](https://1password.com/downloads/command-line/) for secure environment variable management
- Optional: [Docker](https://www.docker.com/get-started) for containerization

### 1Password CLI Setup

TEDI Stack uses 1Password CLI to securely manage environment variables. To set up:

1. Install the 1Password CLI following the [official installation guide](https://developer.1password.com/docs/cli/get-started)

2. Sign in to your 1Password account:
   ```sh
   op account add
   ```

3. Create an `.env.op` file at the root of your project with references to your secrets:
   ```sh
   SENTRY_DSN=op://YourVault/SENTRY/SENTRY_DSN
   SENTRY_AUTH_TOKEN=op://YourVault/SENTRY/SENTRY_AUTH_TOKEN
   # other environment variables...
   ```

4. Use the development script that loads variables from 1Password:
   ```sh
   bun dev:op
   ```

### Installation

```sh
# Clone the repository
git clone https://github.com/koikar/tedi-stack.git
cd tedi-stack

# Install dependencies
bun install

# Start the development server
bun dev
```

### Deployment

To deploy to Fly.io:

1. Install the Flyctl CLI: [Installation Guide](https://fly.io/docs/getting-started/installing-flyctl/)
2. Log in to Fly: `fly auth login`
3. Deploy the app: `fly deploy`

For CI/CD deployment using GitHub Actions, see the workflows defined in `.github/workflows/`.

## 📁 Project Structure

TEDI Stack follows a logical directory structure to organize code efficiently:

```
tedi-stack/
├── app/                   # Main application code
│   ├── components/        # Reusable React components
│   ├── routes/            # General routes, layouts and resource routes
│   ├── utils/             # Utility functions and helpers
│   ├── localization/      # Internationalization files
│   └── features/          # Feature modules
│       ├── marketing/     # Marketing feature
│       ├── analytics/     # Analytics feature
│       ├── authentication/# Authentication feature
│       └── user/          # User management feature
│           ├── components/# Feature-specific components
│           ├── routes/    # Feature-specific routes
│           ├── utils/     # Feature-specific utilities
│           ├── constants/ # Feature-specific constants
│           ├── types/     # Feature-specific types
│           └── server/    # Feature-specific server code
├── public/                # Static files served directly
│   └── favicons/          # Various favicon formats for different devices
├── other/                 # Miscellaneous files and configurations
├── server/                # Hono server configuration
└── tests/                 # Test files for the application
```

Each feature module in `app/features/` follows a similar structure, promoting code organization and modularity.

## 🤝 Contributing

Contributions to TEDI Stack are welcome! Here's how you can contribute:

1. **Fork the Repository**: Create your own fork of the project
2. **Submit a Pull Request**: Once you've tested your changes, submit a PR to the main repository

## ❓ Troubleshooting

### Common Issues

1. **Environment Variable Problems**: Ensure all required environment variables are properly set or configured in 1Password.

2. **Build Failures**: Make sure you're using the correct version of Bun. Check with `bun --version` and update if needed.

3. **1Password Integration Issues**: Verify that the 1Password CLI is correctly installed and authenticated. Run `op account list` to confirm.

4. **Deployment Errors**: When deploying to Fly.io, check that your `fly.toml` configuration is correct and you have the necessary permissions.

For more help, please [open an issue](https://github.com/koikar/tedi-stack/issues) on GitHub.

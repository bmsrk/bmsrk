# Copilot Instructions for bmsrk

This repository contains a personal portfolio/resume website built with React, TypeScript, and Vite, designed to look like Microsoft Dynamics 365.

## Project Overview

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (utility classes)
- **Deployment**: GitHub Pages via Vite static site generation
- **Base URL**: `/bmsrk/` (configured in vite.config.ts)

## Development Commands

```bash
# Install dependencies
npm ci

# Start development server (runs on port 3000)
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format

# Build for production
npm run build

# Preview production build
npm run preview
```

## Code Style and Conventions

### TypeScript

- **Strict mode enabled**: All TypeScript strict checks are enforced
- Use `noImplicitReturns`, `noFallthroughCasesInSwitch`, and `noUncheckedIndexedAccess`
- Prefer explicit types over `any` (warn level)
- Use underscore prefix for unused parameters (e.g., `_unused`)

### React

- **Functional components only**: Use React.FC type annotation
- **Hooks**: Prefer React hooks over class components
- **No prop-types**: TypeScript interfaces are used for type checking
- **JSX**: `react-jsx` transform (no need to import React in every file)
- React is available globally (no need for explicit imports in JSX files)

### Code Formatting

- **Prettier configuration**:
  - Single quotes for strings
  - Semicolons required
  - 2 spaces for indentation
  - Max line width: 100 characters
  - Trailing commas: ES5 style
  
### File Organization

- **Path aliases**: Use `@/*` for imports from `src/` directory
  - Example: `import { Component } from '@/components/common'`
- **Barrel exports**: Use index.ts files to re-export modules
- **Type definitions**: Store in `src/types/` directory
- **Utilities**: Store in `src/utils/` directory
- **Components**: Organize in `src/components/` with common, layout, and features subdirectories

### Component Patterns

- Use named exports for components via barrel exports
- Organize related components in subdirectories
- Keep UI components in `components/common/`
- Keep layout components in `components/layout/`
- Keep feature components in `components/features/`

### State Management

- Use React Context for global state (see `src/context/ResumeContext`)
- Use `useState` for local component state
- Custom hooks in `src/hooks/` directory

## Architecture Notes

- The site mimics Dynamics 365 UI/UX design
- Uses Tailwind CSS utility classes for styling
- Color scheme follows Microsoft Dynamics 365 branding (`#0078d4` primary)
- Responsive design with mobile-first approach

## Build and Deployment

- Production builds are created in `dist/` directory
- Sourcemaps are enabled for debugging
- Deployment happens automatically via GitHub Actions on push to `main`
- The site is deployed to GitHub Pages at `https://bmsrk.github.io/bmsrk`

## Important Files

- `vite.config.ts`: Vite configuration with path aliases and base URL
- `tsconfig.json`: TypeScript compiler options
- `eslint.config.js`: ESLint configuration (flat config format)
- `.prettierrc`: Prettier formatting rules
- `package.json`: Dependencies and scripts

## Testing

- Currently no test framework is configured
- Type checking serves as the primary validation (`npm run type-check`)

## Notes for AI Assistants

- Always use `npm ci` instead of `npm install` for consistent installations
- Run `npm run type-check` before building to catch type errors
- Follow the existing Prettier and ESLint rules
- Maintain the Dynamics 365 design aesthetic when making UI changes
- Use the `@/` path alias for all imports from the src directory
- Ensure all TypeScript strict mode checks pass

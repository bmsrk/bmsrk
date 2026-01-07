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

# Build for production (runs TypeScript compiler + Vite build)
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
- **JSX**: `react-jsx` transform (React doesn't need to be imported for JSX syntax, but React components and hooks still require explicit imports)
- **Performance best practices**:
  - Use `useCallback` to memoize event handlers and callbacks
  - Use `useMemo` to memoize expensive computations and context values
  - Use `useRef` for values that shouldn't trigger re-renders
  - Memoize context provider values to prevent unnecessary re-renders
  - Remove unstable dependencies from effect arrays (use refs for callbacks)

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
- **Custom hooks**: Store in `src/hooks/` directory

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
- **Important hooks**:
  - `useNaturalTyping`: Provides natural typing animation with variable speeds
  - `useSpeakingAnimation`: Coordinates audio playback with typing animation
  - `useResumeData`: Fetches and manages resume data from JSON
  - `useProjectFilter`: Manages project filtering state
  - `useWelcomeFlow`: State machine for welcome modal and tour flow

### Custom Hooks Best Practices

- Always memoize callbacks returned from hooks with `useCallback`
- Use `useRef` for storing callbacks that shouldn't trigger re-renders
- Keep effect dependencies minimal - remove callbacks from dependency arrays when possible
- Ensure proper cleanup in `useEffect` return functions
- Use `useMemo` for singleton instances (e.g., audio singletons)

## Architecture Notes

- The site mimics Dynamics 365 UI/UX design
- Uses Tailwind CSS utility classes for styling
- Color scheme follows Microsoft Dynamics 365 branding (`#0078d4` primary)
- Responsive design with mobile-first approach
- **Audio System**: Uses Web Audio API via `simsAudio` singleton for speech-like sounds
- **Animation System**: Natural typing animation with Sims-like audio playback

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
- `src/utils/simsAudio.ts`: Singleton audio generator for speech-like sounds
- `src/context/ResumeContext.tsx`: Global state management for resume data and filters

## Testing

- Currently no test framework is configured
- Type checking serves as the primary validation (`npm run type-check`)
- Consider adding Vitest, Jest, or React Testing Library for future test coverage

## Notes for AI Assistants

- Use `npm ci` for consistent installations in CI/CD and when package-lock.json exists; use `npm install` when adding new dependencies
- Run `npm run type-check` before building to catch type errors
- Follow the existing Prettier and ESLint rules
- Maintain the Dynamics 365 design aesthetic when making UI changes
- Use the `@/` path alias for all imports from the src directory
- Ensure all TypeScript strict mode checks pass
- **Performance**: Always apply React performance best practices (memoization, refs for callbacks, minimal dependencies)
- **State machines**: Use proper state machine patterns for complex UI flows (see `useWelcomeFlow`)

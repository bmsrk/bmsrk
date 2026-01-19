# Copilot Instructions for bmsrk

This repository contains a personal portfolio/resume website built with React, TypeScript, and Vite, designed to look like Microsoft Dynamics 365.

## Project Overview

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (utility classes)
- **Deployment**: GitHub Pages via Vite static site generation
- **Base URL**: `/bmsrk/` (configured in vite.config.ts)
- **Testing**: Playwright for E2E tests with screenshot capabilities

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

# E2E Testing with Playwright
npm run test:e2e              # Run all E2E tests
npm run test:e2e:ui           # Run tests with Playwright UI
npm run test:e2e:screenshots  # Generate screenshots in screenshots/ directory
```

## Code Style and Conventions

### TypeScript

- **Strict mode enabled**: All TypeScript strict checks are enforced
- Use `noImplicitReturns`, `noFallthroughCasesInSwitch`, and `noUncheckedIndexedAccess`
- Prefer explicit types over `any` (warn level)
- Use underscore prefix for unused parameters (e.g., `_unused`)
- Use type narrowing and type guards for union types
- Define proper interfaces for all component props

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
  - Wrap complex components with `React.memo()` to prevent unnecessary re-renders
  - Use the custom `useTimer` hook for timeout/interval management

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
- **Configuration**: Store in `src/config/` directory
- **Constants**: Store in `src/constants/` directory

### Component Patterns

- Use named exports for components via barrel exports
- Organize related components in subdirectories
- Keep UI components in `components/common/`
- Keep layout components in `components/layout/`
- Keep feature components in `components/features/`
- Use `React.memo()` for components that receive callbacks or complex props
- Always provide proper TypeScript interfaces for component props

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
  - `useTimer`: Manages timers with automatic cleanup
  - `useOnboardingStorage`: Handles localStorage for onboarding state
  - `usePrefersReducedMotion`: Detects user motion preferences for accessibility

### Custom Hooks Best Practices

- Always memoize callbacks returned from hooks with `useCallback`
- Use `useRef` for storing callbacks that shouldn't trigger re-renders
- Keep effect dependencies minimal - remove callbacks from dependency arrays when possible
- Ensure proper cleanup in `useEffect` return functions
- Use `useMemo` for singleton instances (e.g., audio singletons)
- Use the `useTimer` hook for setTimeout/setInterval operations instead of manual cleanup

### Accessibility

- Use semantic HTML elements (button, nav, main, section, etc.)
- Provide proper ARIA labels for interactive elements
- Add `title` attributes to explain disabled buttons
- Use `aria-live` for dynamic content updates
- Ensure keyboard navigation works for all interactive elements
- Support screen readers with descriptive labels
- Never use `<div role="button">` - use `<button>` instead

## Architecture Notes

- The site mimics Dynamics 365 UI/UX design
- Uses Tailwind CSS utility classes for styling
- Color scheme follows Microsoft Dynamics 365 branding (`#0078d4` primary)
- Responsive design with mobile-first approach
- **Audio System**: Uses Web Audio API via `simsAudio` singleton for speech-like sounds
- **Animation System**: Natural typing animation with Sims-like audio playback
- **Easter Eggs**: Konami code support, achievements system
- **Guided Tours**: RecruiterPitchMode and EnhancedPitchMode for interactive onboarding

## Build and Deployment

- Production builds are created in `dist/` directory
- Sourcemaps are enabled for debugging
- Deployment happens automatically via GitHub Actions on push to `main`
- The site is deployed to GitHub Pages at `https://bmsrk.github.io/bmsrk`
- GitHub Actions workflow: `.github/workflows/deploy.yml`

## Important Files

- `vite.config.ts`: Vite configuration with path aliases and base URL
- `tsconfig.json`: TypeScript compiler options
- `eslint.config.js`: ESLint configuration (flat config format)
- `.prettierrc`: Prettier formatting rules
- `package.json`: Dependencies and scripts
- `src/utils/simsAudio.ts`: Singleton audio generator for speech-like sounds
- `src/context/ResumeContext.tsx`: Global state management for resume data and filters
- `src/config/onboarding.ts`: Configuration for welcome flow and tours
- `playwright.config.ts`: Playwright E2E test configuration
- `public/resume_data.json`: Resume data source

## Testing

- **E2E Testing**: Playwright tests in `e2e/` directory
- **Test Coverage**: 
  - Onboarding flow
  - Navigation and tabs
  - Projects filtering
  - Skills interaction
  - Qualifications display
  - Experience timeline
  - Pitch mode tours
  - Easter eggs and achievements
  - Hire me section
- **Screenshot Testing**: Automated screenshot generation in `screenshots/` directory
- Type checking serves as the primary validation (`npm run type-check`)
- No unit test framework configured (React Testing Library could be added)

## CI/CD Pipeline

- **GitHub Actions**: Automated deployment on push to `main`
- **Workflow Steps**:
  1. Checkout code
  2. Setup Node.js
  3. Install dependencies (`npm ci`)
  4. Run type check (`npm run type-check`)
  5. Run linter (`npm run lint`)
  6. Build project (`npm run build`)
  7. Deploy to GitHub Pages

## Notes for AI Assistants

- Use `npm ci` for consistent installations in CI/CD and when package-lock.json exists; use `npm install` when adding new dependencies
- Run `npm run type-check` before building to catch type errors
- Follow the existing Prettier and ESLint rules
- Maintain the Dynamics 365 design aesthetic when making UI changes
- Use the `@/` path alias for all imports from the src directory
- Ensure all TypeScript strict mode checks pass
- **Performance**: Always apply React performance best practices (memoization, refs for callbacks, minimal dependencies)
- **State machines**: Use proper state machine patterns for complex UI flows (see `useWelcomeFlow`)
- **Accessibility**: Always use semantic HTML and proper ARIA attributes
- **Testing**: Run E2E tests to verify UI changes don't break existing functionality
- **Documentation**: Keep README and agents.md in sync with code changes

## Project-Specific Patterns

### Modal Components
- Welcome modals use typing animations with audio
- Tours (PitchMode) navigate between tabs with step-by-step guidance
- Always include ESC key support for closing modals

### Data Loading
- Resume data is fetched from `public/resume_data.json`
- Use `useResumeData` hook for accessing data
- Loading states are handled with LoadingModal component
- Error states should be user-friendly

### Filtering & Search
- Projects can be filtered by technology or business segment
- Skills link to filtered project views
- Use `useProjectFilter` for managing filter state

### Styling Conventions
- Use Tailwind utility classes
- Follow Dynamics 365 color palette
- Responsive breakpoints: sm (640px), md (768px), lg (1024px)
- Print styles use `print:` prefix utilities
- Mobile-first responsive design

## Common Tasks

### Adding a New Component
1. Create component in appropriate directory (common/layout/features)
2. Define TypeScript interface for props
3. Use React.FC type annotation
4. Export via index.ts barrel file
5. Add to relevant parent component
6. Consider React.memo() for complex components

### Adding a New Hook
1. Create hook file in `src/hooks/`
2. Use proper TypeScript return types
3. Memoize callbacks with useCallback
4. Add cleanup in useEffect return
5. Export via `src/hooks/index.ts`
6. Document hook purpose and usage

### Adding a New Feature
1. Plan component structure
2. Update types in `src/types/`
3. Add necessary data to `resume_data.json`
4. Implement components with proper TypeScript
5. Add E2E tests in `e2e/`
6. Update documentation

### Updating Styles
1. Use Tailwind utility classes when possible
2. Follow existing color scheme
3. Test responsive breakpoints
4. Test print styles with `window.print()`
5. Verify accessibility with screen readers

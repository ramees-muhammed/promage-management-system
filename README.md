---------------------- Promage - Enterprise Project Management Dashboard---------------
Promage is a high-fidelity, professional project management dashboard built to demonstrate advanced React patterns, strict TypeScript implementation, and scalable state management.

Tech Stack---------->
Frontend: React 18 with TypeScript
State Management: Redux Toolkit with LocalStorage persistence
Styling: SCSS (BEM Methodology)
Forms & Validation: Formik & Yup
Icons: Lucide React

vercel link : https://promage-management-system.vercel.app/

Folder Structure-------->
src/
├── assets/             # Static images, brand assets, and global icons
├── components/         # Reusable UI components
│   ├── ui/             # Atomic components (Buttons, Modals, StatCards)
│   └── layout/         # Layout components (Sidebar, Topbar)
├── features/           # Domain-driven feature modules
│   ├── dashboard/      # Analytics logic and Progress Gauges
│   ├── projects/       # Project summaries, forms, and detail views
│   └── tasks/          # Global task aggregation and management
├── store/              # Redux Toolkit centralized state
│   ├── slices/         # State logic (projectSlice.ts)
│   ├── hooks.ts        # Type-safe useAppDispatch & useAppSelector
│   └── index.ts        # Store configuration and Middleware
├── styles/             # Global SCSS (Variables, Mixins, Reset)
├── types/              # Centralized TypeScript interfaces (project.ts)
├── utils/              # Helper functions (Date formatting, LocalStorage)
├── App.tsx             # Routing and Global Providers
└── main.tsx            # Application entry point


1. Project Management (CRUD)
Full Lifecycle: Create, Read, Update, and Delete projects with real-time UI updates.
Dynamic Analytics: High-level overview cards calculate total revenue, project counts, and resource allocation dynamically.
Persistence: Custom Redux setup ensures state is synchronized with localStorage, preventing data loss on browser refresh.

2. Advanced Task Tracking
Hierarchical Management: Add tasks directly within a specific project's detail view.
Automated Progress: Project completion percentage is derived automatically based on the status of child tasks (Todo, In Progress, Done).
Global View: A centralized "Tasks" engine aggregates all tasks across the entire organization.

3. Smart Reminders & Notifications
Milestone Tracking: Set time-sensitive reminders for critical project phases.
Upcoming Alerts: A dynamic notification system in the Topbar highlights milestones due within the next 7 days.

4. Search, Filtering & Performance
Instant Search: Filter through large project lists by name or manager instantly.
Performance Optimization: Utilizes useMemo for heavy filtering and sorting logic to ensure a high-performance user experience.












# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

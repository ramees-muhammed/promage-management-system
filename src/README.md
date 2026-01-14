 Promage - Project Management Dashboard
A high-fidelity, professional project management dashboard built with Reac*, TypeScript, and Redux Toolkit.

 Tech Stack
* Frontend: React 18 with TypeScript
* State Management: Redux Toolkit (with LocalStorage persistence)
* Styling: SCSS 
* Forms: Formik & Yup (Validation)
* Icons: Lucide React

  
# Folder Structure
src/
├── assets/              Static images, fonts, and global icons
├── components/          Shared UI components
│   ├── ui/              Atomic components (Buttons, Inputs, Modals)
│   └── layout/          Layout components (Sidebar, Topbar)
├── features/           Domain-driven feature modules
│   ├── dashboard/       Dashboard charts and stats logic
│   ├── projects/        Project listing, forms, and detail views
│   └── tasks/           Global task management logic
├── store/               Redux Toolkit setup
│   ├── slices/          State logic (projectSlice.ts)
│   ├── hooks.ts         Typed useAppDispatch & useAppSelector
│   └── index.ts         Store configuration
├── styles/              Global SCSS (variables, mixins, reset)
├── types/               TypeScript interfaces/types (project.ts)
├── utils/              Helper functions (date formatting, storage)
├── App.tsx              Main routing and global providers
└── main.tsx             Entry point

 Features
 1. Project Management
* CRUD Operations: Create, Read, Update, and Delete projects.
* Dynamic Overview: Real-time calculation of revenue, project counts, and resource allocation.
* Persistent Data: State is synchronized with `localStorage` to prevent data loss on refresh.

 2. Task Tracking
* Project-Specific Tasks: Add tasks directly within a project's detail view.
* Automated Progress: The project completion percentage updates automatically based on the status of child tasks.
* Global Task View: A centralized "Tasks" page that aggregates tasks across all active projects.

 3. Smart Reminders
* Milestone Tracking: Add time-sensitive reminders to projects.
* Upcoming Alerts: A dynamic notification system in the Topbar highlights milestones due within the next 7 days.

 4. Search & Filtering
* Instant Search: Filter projects by name or manager in real-time using `useMemo` for performance.
* Status Sorting: Organize the project table by status, due date, or progress.

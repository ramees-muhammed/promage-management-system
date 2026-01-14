import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Project, Task } from '../../types/project';

// Persistence Helpers
const STORAGE_KEY = 'app_projects_data';

const loadFromLocalStorage = (): Project[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

const saveToLocalStorage = (projects: Project[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

interface ProjectState {
  projects: Project[];
}

const initialState: ProjectState = {
  projects: loadFromLocalStorage(),
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
      saveToLocalStorage(state.projects);
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(p => p.id !== action.payload);
      saveToLocalStorage(state.projects);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
        saveToLocalStorage(state.projects);
      }
    },

    addTask: (state, action: PayloadAction<{ projectId: string; task: Task }>) => {
  const project = state.projects.find(p => p.id === action.payload.projectId);
  if (project) {
    project.tasks.push(action.payload.task);
    localStorage.setItem('app_projects_data', JSON.stringify(state.projects));
  }
},

updateTaskStatus: (state, action: PayloadAction<{ projectId: string; taskId: string; status: Task['status'] }>) => {
  const project = state.projects.find(p => p.id === action.payload.projectId);
  if (project) {
    const task = project.tasks.find(t => t.id === action.payload.taskId);
    if (task) {
      task.status = action.payload.status;
      localStorage.setItem('app_projects_data', JSON.stringify(state.projects));
    }
  }
}
  },
});

export const { addProject, deleteProject, updateProject, addTask, updateTaskStatus } = projectSlice.actions;
export default projectSlice.reducer;
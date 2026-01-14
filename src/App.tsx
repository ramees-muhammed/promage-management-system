// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ProjectForm from './features/projects/components/ProjectForm';

// const App: React.FC = () => {
//   return (
//     // 1. Router goes on the very outside
//     <Router>
//       {/* 2. Routes acts as a switch/container */}
//       <Routes>
//         {/* 3. Each page is defined by a Route with a path and element */}
//         <Route path="/" element={<ProjectForm />} />
        
//         {/* Example of adding another route later:
//         <Route path="/dashboard" element={<Dashboard />} /> 
//         */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;



import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Layout } from './components/Layout/Layout';
import Dashboard from './features/dashboard/Dashboard';
import ProjectTable from "./features/projects/components/ProjectTable";
import ProjectDetails from "./features/projects/components/ProjectDetail/ProjectDetails";
import Tasks from "./features/projects/Tasks/Tasks";
import RemindersPage from "./features/projects/RemindersPage/RemindersPage";




const App: React.FC = () => {
  return (
    <Router>
      <Routes>
<Route element={<Layout />}>
  <Route path="/" element={<Dashboard />} />
  <Route path="/projects" element={<ProjectTable />} />
  <Route path="/project-detail/:projectId" element={<ProjectDetails/>} />
  <Route path="/tasks" element={<Tasks />} />
    <Route path="/reminder" element={<RemindersPage />} />
</Route>
      </Routes>
    </Router>
  );
};

export default App;



import ProjectTable from '../projects/components/ProjectTable';
import "./Dashboard.scss";
import { useAppSelector } from '../../store/slices/hooks';
import ProgressGauge from './components/ProgressGauge';

const Dashboard = () => {
  const projects = useAppSelector((state) => state.projects.projects);




  const totalTasks = projects.reduce((acc, p) => acc + (p.tasks?.length || 0), 0);
  const completedTasks = projects.reduce((acc, p) => 
    acc + (p.tasks?.filter(t => t.status === 'Done').length || 0), 0);
  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 72;

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">Overview</h1>
        <select className="dashboard__date-picker">
          <option>Last 30 days</option>
        </select>
      </header>
{/* 
      <section className="dashboard__stats-grid">
        <StatCard 
          title="Total revenue" 
          value={`$${totalRevenue.toLocaleString()}`} 
          change="12% increase" 
          trend="up" 
          icon="📊" 
        />
        <StatCard 
          title="Projects" 
          value={`${completedProjects}/${totalProjects}`} 
          change="10% decrease" 
          trend="down" 
          icon="💼" 
        />
        <StatCard 
          title="Time spent" 
          value="1022 /1300 Hrs" 
          change="8% increase" 
          trend="up" 
          icon="🕒" 
        />
        <StatCard 
          title="Resources" 
          value="101 /120" 
          change="2% increase" 
          trend="up" 
          icon="👤" 
        />
      </section> */}

      <div className="dashboard__bottom-section">
        <section className="dashboard__project-summary">
          <div className="dashboard__section-header">
            <h2 className="dashboard__subtitle">Project summary</h2>
            <div className="dashboard__filters">
              <button className="dashboard__filter-btn">Project</button>
              <button className="dashboard__filter-btn">Project manager</button>
              <button className="dashboard__filter-btn">Status</button>
            </div>
          </div>
          <ProjectTable />
        </section>

        <section className="dashboard__overall-progress">
          <h2 className="dashboard__subtitle">Overall Progress</h2>
          <ProgressGauge value={overallProgress} />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
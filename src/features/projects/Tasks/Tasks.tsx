
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import './Tasks.scss';
import { useAppSelector } from '../../../store/slices/hooks';

const Tasks = () => {
  const projects = useAppSelector((state) => state.projects.projects);


  const allTasks = projects.flatMap(project => 
    project.tasks.map(task => ({
      ...task,
      projectName: project.name, 
      projectId: project.id
    }))
  );

  return (
    <div className="tasks-page">
      <header className="tasks-page__header">
        <h1>All Tasks ({allTasks.length})</h1>
      </header>

      <div className="tasks-list">
        {allTasks.length > 0 ? (
          allTasks.map((task) => (
            <div key={task.id} className="task-card">
              <div className="task-card__status">
                {task.status === 'Done' ? (
                  <CheckCircle2 className="icon-done" size={20} />
                ) : task.status === 'In Progress' ? (
                  <Clock className="icon-progress" size={20} />
                ) : (
                  <AlertCircle className="icon-todo" size={20} />
                )}
              </div>
              
              <div className="task-card__content">
                <h3>{task.name}</h3>
                <p className="project-tag">Project: {task.projectName}</p>
                <p className="description">{task.description}</p>
              </div>

              <div className="task-card__meta">
                <span className="assignee">{task.assignedTo}</span>
                <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>
                  {task.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">No tasks found. Start by adding tasks to a project!</div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
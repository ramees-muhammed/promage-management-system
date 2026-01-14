//ProjectDetails.tsx//

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Edit3, Plus, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useAppSelector } from '../../../../store/slices/hooks';

import "./ProjectDetails.scss";
import ProjectForm from '../ProjectForm';
import TaskModal from '../../../../components/ui/Modal/TaskModal';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const project = useAppSelector((state) =>
    state.projects.projects.find((p) => p.id === projectId)
  );

  if (!project) return <div className="error-state">Project not found.</div>;

  // Calculate Task Completion
  const totalTasks = project.tasks?.length || 0;
  const completedTasks = project.tasks?.filter(t => t.status === 'Done').length || 0;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="project-detail-page">

      <div className="detail-nav">
        <button className="btn-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back to Projects
        </button>
        <button className="btn-edit-main" onClick={() => setIsEditModalOpen(true)}>
          <Edit3 size={18} /> Edit Project
        </button>
      </div>

      <div className="detail-grid">
        {/* LEFT COLUMN: Summary & Tasks */}
        <div className="detail-main">
          <section className="summary-card">
            <div className="summary-header">
              <div>
                <span className={`status-pill ${project.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {project.status}
                </span>
                <h1>{project.name}</h1>
              </div>
              <div className="progress-circle-box">
                <span className="percent">{progressPercent}%</span>
                <span className="label">Complete</span>
              </div>
            </div>
            <p className="description">{project.description || "No description provided."}</p>
            
            <div className="meta-info">
              <div className="info-item">
                <Calendar size={16} />
                <span>{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</span>
              </div>
              <div className="info-item">
                <AlertCircle size={16} />
                <span>Priority: <strong>{project.priority}</strong></span>
              </div>
            </div>

            <div className="assignees-section">
              <h4>Team Members</h4>
              <div className="avatar-group">
                {project.assignees.map((name, i) => (
                  <div key={i} className="avatar" title={name}>
                    {name.charAt(0)}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="tasks-section">
            <div className="section-header">
              <h3>Tasks ({totalTasks})</h3>
           <button className="btn-add-task" onClick={() => setIsTaskModalOpen(true)}>
                <Plus size={16} /> Add Task
             </button>
            </div>
            <div className="task-list">
              {totalTasks > 0 ? (
                project.tasks.map(task => (
                  <div key={task.id} className="task-item">
                    <CheckCircle2 size={18} className={task.status === 'Done' ? 'done' : ''} />
                    <div className="task-info">
                      <span>{task.name}</span>
                      <small>{task.assignedTo}</small>
                    </div>
                    <span className={`task-status ${task.status.toLowerCase()}`}>{task.status}</span>
                  </div>
                ))
              ) : (
                <p className="empty-msg">No tasks assigned yet.</p>
              )}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Reminders */}
        <div className="detail-sidebar">
          <section className="reminders-card">
            <h3>Milestones & Reminders</h3>
            <div className="reminder-timeline">
              {project.reminders?.length > 0 ? (
                project.reminders.map(rem => (
                  <div key={rem.id} className="reminder-entry">
                    <div className="reminder-icon"><Clock size={14} /></div>
                    <div className="reminder-text">
                      <p>{rem.description}</p>
                      <small>{new Date(rem.date).toLocaleDateString()}</small>
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty-msg">No reminders set.</p>
              )}
            </div>
          </section>
        </div>
      </div>


      {isEditModalOpen && (
        <div className="modal-overlay">
          <ProjectForm 
            initialData={project} 
            onClose={() => setIsEditModalOpen(false)} 
          />
        </div>
      )}

      {isTaskModalOpen && (
         <TaskModal 
           projectId={project.id} 
           assignees={project.assignees} 
           onClose={() => setIsTaskModalOpen(false)} 
         />
       )}
    </div>
  );
};

export default ProjectDetail;
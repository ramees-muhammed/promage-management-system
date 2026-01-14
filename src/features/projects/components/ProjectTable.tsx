import React, { useState, useMemo } from 'react';
import { Eye, Trash2, Search, Filter } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../../store/slices/hooks';
import { deleteProject } from '../../../store/slices/projectSlice';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from '../../../components/ui/Modal/DeleteConfirmationModal';
import './ProjectTable.scss';

const ProjectTable: React.FC = () => {
  const projects = useAppSelector((state) => state.projects.projects);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // --- Search & Filter State ---
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [projectToDelete, setProjectToDelete] = useState<{id: string, name: string} | null>(null);

  // --- Filtering & Searching Logic ---
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.manager.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [projects, searchTerm, statusFilter]);

  const calculateProgress = (tasks: any[]) => {
    if (!tasks || tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.status === 'Done').length;
    return Math.round((completed / tasks.length) * 100);
  };

  return (
    <div className="project-table-container">
      <div className="table-controls">
        <div className="search-bar">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="table-filters">
           <div className="filter-item">
             <Filter size={16} />
             <select 
               className="filter-select" 
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
             >
               <option value="All">All Status</option>
               <option value="Planned">Planned</option>
               <option value="In Progress">In Progress</option>
               <option value="Completed">Completed</option>
               <option value="At Risk">At Risk</option>
             </select>
           </div>
        </div>
      </div>

      <table className="project-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Project manager</th>
            <th>Due date</th>
            <th>Status</th>
            <th>Progress</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.length === 0 ? (
            <tr>
              <td colSpan={6} className="empty-state">No projects found.</td>
            </tr>
          ) : (
            filteredProjects.map((project) => {
              const progress = calculateProgress(project.tasks);
              return (
                <tr key={project.id} className="project-row">
                  <td className="project-name">{project.name}</td>
                  <td className="project-manager">{project.manager}</td>
                  <td className="project-date">
                    {new Date(project.endDate).toLocaleDateString()}
                  </td>
                  <td>
                    <span className={`status-badge ${project.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {project.status}
                    </span>
                  </td>
                  <td>
                    <div className="progress-wrapper">
                      <div className="progress-bar-container">
                        <div className="progress-fill" style={{ width: `${progress}%` }} />
                      </div>
                      <span className="progress-text">{progress}%</span>
                    </div>
                  </td>
                  <td className="actions">
                    <div className="action-buttons">
                      <button className="icon-btn view" onClick={() => navigate(`/projects/${project.id}`)}>
                        <Eye size={16} />
                      </button>
                      <button className="icon-btn delete" onClick={() => setProjectToDelete({id: project.id, name: project.name})}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {projectToDelete && (
        <DeleteConfirmationModal
          title="Delete Project"
          itemName={projectToDelete.name}
          onClose={() => setProjectToDelete(null)}
          onConfirm={() => {
            dispatch(deleteProject(projectToDelete.id));
            setProjectToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default ProjectTable;
import React from 'react';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { Plus, Trash2, X } from 'lucide-react';
import { addProject, updateProject } from '../../../store/slices/projectSlice';
import { useAppDispatch } from '../../../store/slices/hooks';
import type { Project, Status, Priority } from "../../../types/project";
import "./ProjectForm.scss";

interface ProjectFormProps {
  onClose: () => void;
  initialData?: Project; 
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onClose, initialData }) => {
  const dispatch = useAppDispatch();
  const isEditMode = !!initialData;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Project Title is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date()
      .required('End date is required')
      .min(Yup.ref('startDate'), 'End date must be after start date'),
    assignees: Yup.array()
      .min(1, 'At least one assignee is required')
      .required('At least one assignee is required'),
    status: Yup.string().required('Status is required'),
    priority: Yup.string().required('Priority is required'),
  });

  const formik = useFormik({

    enableReinitialize: true, 
    initialValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      type: initialData?.type || '',
      startDate: initialData?.startDate || '',
      endDate: initialData?.endDate || '',
      status: (initialData?.status || 'Planned') as Status,
      priority: (initialData?.priority || 'Medium') as Priority,
      assignees: initialData?.assignees || [],
      reminders: initialData?.reminders || [],
    },
    validationSchema,
    onSubmit: (values) => {
      if (isEditMode && initialData) {
        // UPDATE LOGIC
        dispatch(updateProject({
          ...initialData,
          ...values,
        }));
      } else {
        // CREATE LOGIC
        const newProject: Project = {
          ...values,
          id: crypto.randomUUID(),
          manager: 'Alex Meian',
          tasks: [],
        };
        dispatch(addProject(newProject));
      }
      onClose();
    },
  });

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    formik.setFieldValue('assignees', selectedOptions);
  };

  return (
    <div className="project-form-modal">
      <div className="project-form-container">
        <header className="project-form-header">
          <div className="title-area">
            <h2>{isEditMode ? 'Edit Project' : 'Create New Project'}</h2>
            <p>{isEditMode ? `Updating: ${initialData?.name}` : 'Launch your next project.'}</p>
          </div>
          <button type="button" className="close-icon-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </header>

        <FormikProvider value={formik}>
          <form className="project-form" onSubmit={formik.handleSubmit}>
            <div className="form-grid">
              <div className={`form-group ${formik.touched.name && formik.errors.name ? 'error' : ''}`}>
                <label>Project Title *</label>
                <input type="text" {...formik.getFieldProps('name')} placeholder="Project name" />
                {formik.touched.name && formik.errors.name && <span className="error-msg">{formik.errors.name}</span>}
              </div>

              <div className="form-group">
                <label>Project Category</label>
                <input type="text" {...formik.getFieldProps('type')} placeholder="e.g. Design" />
              </div>

              <div className="form-group">
                <label>Start Date *</label>
                <input type="date" {...formik.getFieldProps('startDate')} />
              </div>

              <div className="form-group">
                <label>End Date *</label>
                <input type="date" {...formik.getFieldProps('endDate')} />
              </div>

              <div className="form-group">
                <label>Priority</label>
                <select {...formik.getFieldProps('priority')}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select {...formik.getFieldProps('status')}>
                  <option value="Planned">Planned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                  <option value="At Risk">At Risk</option>
                  <option value="Delayed">Delayed</option>
                </select>
              </div>

              <div className="form-group-full">
                <label>Assign Team Members *</label>
                <select multiple className="multi-select-box" value={formik.values.assignees} onChange={handleAssigneeChange}>
                  <option value="Alex Meian">Alex Meian</option>
                  <option value="Sarah Chen">Sarah Chen</option>
                  <option value="Mike Ross">Mike Ross</option>
                  <option value="Elena Rodriguez">Elena Rodriguez</option>
                </select>
              </div>
            </div>

            <div className="form-group-full">
              <label>Description</label>
              <textarea rows={3} {...formik.getFieldProps('description')} />
            </div>

            <div className="reminder-section">
              <div className="section-header">
                <h3>Milestone Reminders</h3>
                <button type="button" className="add-button" onClick={() => formik.setFieldValue('reminders', [...formik.values.reminders, { id: crypto.randomUUID(), date: '', description: '' }])}>
                  <Plus size={16} /> Add milestone
                </button>
              </div>
              {formik.values.reminders.map((rem, index) => (
                <div key={rem.id} className="reminder-row">
                  <input type="date" name={`reminders[${index}].date`} value={rem.date} onChange={formik.handleChange} />
                  <input type="text" name={`reminders[${index}].description`} value={rem.description} onChange={formik.handleChange} />
                  <button type="button" className="delete-icon-btn" onClick={() => formik.setFieldValue('reminders', formik.values.reminders.filter((_, i) => i !== index))}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <footer className="form-actions">
              <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn-create" disabled={formik.isSubmitting}>
                {isEditMode ? 'Update Project' : 'Create Project'}
              </button>
            </footer>
          </form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default ProjectForm;
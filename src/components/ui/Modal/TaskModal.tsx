
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { X } from 'lucide-react';
import { useAppDispatch } from '../../../store/slices/hooks';
import type { Task } from '../../../types/project';
import { addTask } from '../../../store/slices/projectSlice';
import "./TaskModal.scss";

interface TaskModalProps {
  projectId: string;
  assignees: string[];
  onClose: () => void;
}

const TaskModal = ({ projectId, assignees, onClose }: TaskModalProps) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      assignedTo: '',
      status: 'Todo' as Task['status'],
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Task name is too short')
        .required('Task name is required'),
      assignedTo: Yup.string()
        .required('Please assign this task to a team member'),
      status: Yup.string().required(),
      description: Yup.string().max(200, 'Description is too long'),
    }),
    onSubmit: (values) => {
      const newTask: Task = {
        id: crypto.randomUUID(),
        ...values,
      };
      dispatch(addTask({ projectId, task: newTask }));
      onClose();
    },
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="task-modal-container" onClick={(e) => e.stopPropagation()}>
        <header className="task-modal-header">
          <div className="title-area">
            <h3>Add New Task</h3>
            <p>Assign a specific action item to your team.</p>
          </div>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </header>

        <form onSubmit={formik.handleSubmit} className="task-form">
          <div className="form-body">
            {/* Task Name */}
            <div className={`form-group ${formik.touched.name && formik.errors.name ? 'error' : ''}`}>
              <label>Task Name *</label>
              <input 
                type="text" 
                {...formik.getFieldProps('name')} 
                placeholder="e.g. Design System Audit" 
              />
              {formik.touched.name && formik.errors.name && (
                <span className="error-msg">{formik.errors.name}</span>
              )}
            </div>

            {/* Assigned User */}
            <div className={`form-group ${formik.touched.assignedTo && formik.errors.assignedTo ? 'error' : ''}`}>
              <label>Assignee *</label>
              <select {...formik.getFieldProps('assignedTo')}>
                <option value="">Select team member...</option>
                {assignees.map(user => <option key={user} value={user}>{user}</option>)}
              </select>
              {formik.touched.assignedTo && formik.errors.assignedTo && (
                <span className="error-msg">{formik.errors.assignedTo}</span>
              )}
            </div>

            {/* Status */}
            <div className="form-group">
              <label>Initial Status</label>
              <select {...formik.getFieldProps('status')}>
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            {/* Description */}
            <div className="form-group-full">
              <label>Task Description</label>
              <textarea 
                rows={3} 
                {...formik.getFieldProps('description')} 
                placeholder="Briefly describe the task requirements..."
              />
            </div>
          </div>

          <footer className="task-modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={formik.isSubmitting}>
              Create Task
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
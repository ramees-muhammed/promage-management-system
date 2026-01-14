import React from 'react';
import { Trash2, X, AlertTriangle } from 'lucide-react';
import "./DeleteConfirmationModal.scss";

interface DeleteConfirmationModalProps {
  title: string;
  itemName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ 
  title, 
  itemName, 
  onClose, 
  onConfirm 
}) => {

    
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="delete-modal-container" onClick={(e) => e.stopPropagation()}>
        <header className="delete-modal-header">
          <div className="icon-box">
            <AlertTriangle size={24} color="#ef4444" />
          </div>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </header>

        <div className="delete-modal-body">
          <h3>{title}</h3>
          <p>
            Are you sure you want to delete <strong>"{itemName}"</strong>? 
            This action cannot be undone and all related data will be permanently removed.
          </p>
        </div>

        <footer className="delete-modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-danger" onClick={onConfirm}>
            <Trash2 size={18} /> Delete Project
          </button>
        </footer>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
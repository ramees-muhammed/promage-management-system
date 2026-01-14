import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import "./Layout.scss";
import ProjectForm from "../../features/projects/components/ProjectForm";

export const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Functions to toggle modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="app-layout">
      {/* Pass the toggle function to Sidebar */}
      <Sidebar onCreateClick={handleOpenModal} />
      
      <main className="main-viewport">
        <Topbar />
        <div className="content-container">
          <Outlet /> 
        </div>
      </main>

      {/* Modal Portal Logic */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ProjectForm onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};
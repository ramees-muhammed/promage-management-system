//Sidebar.tsx//

import { LayoutDashboard, Briefcase, CheckSquare, Clock, Plus } from 'lucide-react';
import './Sidebar.scss';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  onCreateClick: () => void;
}


const Sidebar = ({ onCreateClick }: SidebarProps) => {
  const menuItems = [
  { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Projects', icon: <Briefcase size={20} />, path: '/projects' }, 
    { name: 'Tasks', icon: <CheckSquare size={20} />, path: '/tasks'  },
    { name: 'Reminders', icon: <Clock size={20} />, path: '/reminder' },
    // { name: 'Resource mgnt', icon: <Users size={20} />, path: '/resources' },
    // { name: 'Users', icon: <Users size={20} />, path: '/users' },
    // { name: 'Project template', icon: <Copy size={20} />, path: '/templates' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar__logo-section">
        <div className="sidebar__logo-icon">⚙️</div>
        <span className="sidebar__logo-text">Promage</span>
      </div>

      <button className="sidebar__create-btn" onClick={onCreateClick}>
        <div className="sidebar__plus-icon"><Plus size={18} /></div>
        <span>Create new project</span>
      </button>

      <nav className="sidebar__nav">
        {menuItems.map((item, index) => (
          <NavLink 
            key={index} 
            to={item.path}
          
            className={({ isActive }) => `sidebar__nav-item ${isActive ? 'is-active' : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

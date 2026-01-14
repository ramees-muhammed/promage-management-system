import { useMemo, useState } from 'react';
import { Bell, ChevronDown, Clock } from "lucide-react";
import "./Topbar.scss";
import { useAppSelector } from '../../store/slices/hooks';

const Topbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const projects = useAppSelector((state) => state.projects.projects);


  const upcomingReminders = useMemo(() => {
    const today = new Date().setHours(0, 0, 0, 0);
    return projects
      .flatMap(p => (p.reminders || []).map(r => ({ ...r, projectName: p.name })))
      .filter(rem => new Date(rem.date).getTime() >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  }, [projects]);

  const upcomingCount = upcomingReminders.length;

  return (
    <header className="topbar">
      <h2 className="topbar__title">Dashboard</h2>

      <div className="topbar__actions">
        <div className="topbar__notification-wrapper">
          <button 
            className={`topbar__notification-btn ${showNotifications ? 'is-active' : ''}`}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            {upcomingCount > 0 && <span className="topbar__badge">{upcomingCount}</span>}
          </button>

          {showNotifications && (
            <div className="topbar__dropdown">
              <div className="topbar__dropdown-header">
                <span>Notifications</span>
                {upcomingCount > 0 && <span className="count-tag">{upcomingCount} New</span>}
              </div>
              <div className="topbar__dropdown-body">
                {upcomingReminders.length > 0 ? (
                  upcomingReminders.map((rem) => (
                    <div key={rem.id} className="notification-item">
                      <div className="icon"><Clock size={14} /></div>
                      <div className="text">
                        <p>{rem.description}</p>
                        <small>{rem.projectName} • {new Date(rem.date).toLocaleDateString()}</small>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">No new notifications</div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="topbar__profile">
          <img src="/avatar/user3.jpg" alt="User" className="topbar__avatar" />
          <div className="topbar__user-info">
            <span className="topbar__user-name">Alex meian</span>
            <span className="topbar__user-role">Project manager</span>
          </div>
          <ChevronDown size={16} className="topbar__chevron" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;

import { useMemo } from 'react';

import { Clock, Calendar, Bell, ChevronRight } from 'lucide-react';
import './RemindersPage.scss';
import { useAppSelector } from '../../../store/slices/hooks';

const RemindersPage = () => {
  const projects = useAppSelector((state) => state.projects.projects);

  const allReminders = useMemo(() => {
    const flattened = projects.flatMap(project => 
      (project.reminders || []).map(rem => ({
        ...rem,
        projectName: project.name,
        projectId: project.id
      }))
    );


    return flattened.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [projects]);

  const isUpcoming = (dateStr: string) => {
    const remDate = new Date(dateStr);
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    return remDate >= today && remDate <= nextWeek;
  };

  return (
    <div className="reminders-page">
      <header className="reminders-header">
        <h1>Reminders & Milestones</h1>
        <p>Stay updated with your project timelines and upcoming deadlines.</p>
      </header>

      <div className="reminders-grid">
        {allReminders.length > 0 ? (
          allReminders.map((rem) => {
            const upcoming = isUpcoming(rem.date);
            return (
              <div key={rem.id} className={`reminder-card ${upcoming ? 'is-upcoming' : ''}`}>
                <div className="reminder-card__icon">
                  {upcoming ? <Bell className="pulse-icon" size={20} /> : <Clock size={20} />}
                </div>
                
                <div className="reminder-card__info">
                  <div className="date-tag">
                    <Calendar size={14} />
                    {new Date(rem.date).toLocaleDateString('en-US', { 
                      month: 'short', day: 'numeric', year: 'numeric' 
                    })}
                    {upcoming && <span className="urgent-badge">Upcoming</span>}
                  </div>
                  <h3>{rem.description}</h3>
                  <span className="project-link">
                    Project: <strong>{rem.projectName}</strong>
                  </span>
                </div>

                <div className="reminder-card__action">
                  <ChevronRight size={20} />
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-reminders">
            <Clock size={48} />
            <p>No reminders scheduled. Milestone deadlines will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RemindersPage;
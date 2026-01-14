
import './ProgressGauge.scss';

const ProgressGauge = ({ value }: { value: number }) => {
  const radius = 80;
  const circumference = Math.PI * radius; 
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="progress-gauge">
      <svg viewBox="0 0 200 120">
  
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="12"
          strokeLinecap="round"
        />
    
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
      </svg>
      <div className="progress-gauge__content">
        <span className="value">{value}%</span>
        <span className="label">Completed</span>
      </div>
      <div className="progress-gauge__footer">
        <span>95</span>
        <span>26</span>
        <span>35</span>
        <span>35</span>
      </div>
    </div>
  );
};

export default ProgressGauge;
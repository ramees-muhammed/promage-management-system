import React from 'react';
import "./StatCard.scss";
import Card from '../../../components/ui/Card/Card';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

export const StatCard = ({ title, value, change, icon, trend }: StatCardProps) => (

  <Card className="stat-card">
    <div className="stat-card__icon-wrapper">{icon}</div>
    <div className="stat-card__content">
      <p className="stat-card__title">{title}</p>
      <h2 className="stat-card__value">{value}</h2>

      <span className={`stat-card__trend stat-card__trend--${trend}`}>
        {trend === 'up' ? '↗' : '↘'} {change} from last month
      </span>
    </div>
  </Card>
);
import React from 'react';
import "./Card.scss";

interface CardProps {
  children: React.ReactNode;
  className?: string; 
} 

const Card = ({ children, className = "" }: CardProps) => {
  return (

    <div className={`card-base ${className}`}>
      {children}
    </div>
  );
};

export default Card;
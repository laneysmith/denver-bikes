import React, { HTMLAttributes } from 'react';

interface TrailIconProps extends HTMLAttributes<HTMLElement> {
  label: string;
  color: string;
}

const TrailIcon: React.FC<TrailIconProps> = ({ label, color }) => {
  return (
    <>
      <svg className="legend-icon" viewBox="0 0 24 24" role="img">
        <title>{label}</title>
        <rect x="6" y="6" width="12" height="12" fill={color} />
      </svg>
      {label}
    </>
  );
};

export default TrailIcon;

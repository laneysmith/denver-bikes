import React, { HTMLAttributes } from 'react';

interface TrailIconProps extends HTMLAttributes<HTMLElement> {
  color: string;
}

const TrailIcon: React.SFC<TrailIconProps> = ({ color }) => (
  <svg className="legend-icon" viewBox="0 0 24 24">
    <rect x="6" y="12" width="12" height="3" fill={color} style={{ opacity: 0.8 }} />
  </svg>
);

export default TrailIcon;

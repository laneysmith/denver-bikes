import React, { HTMLAttributes } from 'react';

const SIZE = 12;
const SPACING = 6;
const SVG_SIZE = SIZE + SPACING * 2;

interface TrailIconProps extends HTMLAttributes<HTMLElement> {
  label: string;
  color: string;
}

const TrailIcon: React.FC<TrailIconProps> = ({ label, color }) => {
  return (
    <>
      <svg className="legend-icon" viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} role="img">
        <title>{label}</title>
        <rect x={SPACING} y={SPACING} width={SIZE} height={SIZE} fill={color} />
      </svg>
      {label}
    </>
  );
};

export default TrailIcon;

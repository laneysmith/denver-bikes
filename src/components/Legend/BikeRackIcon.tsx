import React from 'react';

import { Color } from '../../constants';

const BikeRackIcon: React.FC = () => (
  <>
    <svg className="legend-icon" viewBox="0 0 24 24" aria-labelledby="BikeRackIcon" role="img">
      <title id="BikeRackIcon">Bike Rack</title>
      <circle cx="12" cy="12" r="6" fill={Color.Blue} />
    </svg>
    Bike Rack
  </>
);

export default BikeRackIcon;

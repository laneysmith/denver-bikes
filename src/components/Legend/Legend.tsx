import React from 'react';

import BikeRackIcon from './BikeRackIcon';
import TrailIcon from './TrailIcon';

import './_legend-styles.css';

const Legend: React.SFC = () => (
  <div id="legend" className="legend">
    <div className="legend-section">
      <div className="legend-grid">
        <div>
          <TrailIcon />
        </div>
        <div className="legend-label">sidewalks & trails</div>
        <div>
          <BikeRackIcon />
        </div>
        <div className="legend-label">bike racks</div>
      </div>
    </div>
    <div className="legend-section source-notes">
      <a
        href="https://github.com/laneysmith/denver-bikes"
        target="_blank"
        rel="noopener noreferrer"
      >
        view source on github
      </a>
    </div>
  </div>
);

export default Legend;

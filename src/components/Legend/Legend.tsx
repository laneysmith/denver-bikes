import React from 'react';

import BikeRackIcon from './BikeRackIcon';
import TrailIcon from './TrailIcon';

import './_legend-styles.css';

const Legend: React.SFC = () => (
  <div id="legend" className="legend">
    <div className="legend-section">
      <div className="legend-grid">
        <TrailIcon color="#e7185a" />
        <div className="legend-label">Shared Roadway</div>
        <TrailIcon color="#FFA500" />
        <div className="legend-label">Bike Lane</div>
        <TrailIcon color="#90EE90" />
        <div className="legend-label">Buffered Bike Lane</div>
        <TrailIcon color="#50C878" />
        <div className="legend-label">Protected Bike Lane</div>
        <TrailIcon color="#006400" />
        <div className="legend-label">Shared Use Path</div>
        <TrailIcon color="#A0522D" />
        <div className="legend-label">Trail</div>
        <BikeRackIcon />
        <div className="legend-label">Bike Rack</div>
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

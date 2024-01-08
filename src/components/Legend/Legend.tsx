import React, { useState } from 'react';
import { Collapse } from 'react-collapse';

import { COLOR_MAP } from '../../constants';
import BikeRackIcon from './BikeRackIcon';
import TrailIcon from './TrailIcon';

import './_legend-styles.css';

const Legend: React.FC = () => {
  const [isLegendCollapsed, setIsLegendCollapsed] = useState(false);
  const toggleLegend = (): void => setIsLegendCollapsed((prevState) => !prevState);

  return (
    <div id="legend" className="legend">
      <div className="legend-section">
        <div className="legend-label">Legend</div>
        <button type="button" onClick={toggleLegend} aria-label="toggle legend visibility">
          {isLegendCollapsed ? 'Show' : 'Hide'}
        </button>
      </div>
      <Collapse isOpened={!isLegendCollapsed}>
        <>
          <div className="legend-section labels">
            <label>Path type, listed most preferred (safest) to least preferred</label>
            <div className="legend-grid">
              {Object.entries(COLOR_MAP).map(([facilityType, color]) => (
                <TrailIcon key={facilityType} label={facilityType} color={color} />
              ))}
            </div>
            <label>Bike resources</label>
            <div className="legend-grid">
              <BikeRackIcon />
            </div>
          </div>
          <div className="legend-section source-notes">
            made by{' '}
            <a href="https://laney.tech" target="_blank" rel="noopener noreferrer">
              Laney Smith
            </a>{' '}
            |{' '}
            <a
              href="https://github.com/laneysmith/denver-bikes"
              target="_blank"
              rel="noopener noreferrer"
            >
              view source
            </a>
          </div>
        </>
      </Collapse>
    </div>
  );
};

export default Legend;

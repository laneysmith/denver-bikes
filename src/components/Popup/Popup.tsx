import React, { HTMLAttributes } from 'react';
import { MapboxGeoJSONFeature } from 'mapbox-gl';

import './_popup-styles.css';

interface PopupProps extends HTMLAttributes<HTMLElement> {
  feature: MapboxGeoJSONFeature;
}

const Popup: React.FC<PopupProps> = ({ feature }) => {
  const { id, properties } = feature;
  const formattedRoadLength = new Intl.NumberFormat('en-US', {
    style: 'unit',
    unit: 'mile',
    unitDisplay: 'long',
    maximumSignificantDigits: 2,
  }).format(properties?.roadLength);

  return (
    <div id={`popup-${id}`}>
      <h3>{properties?.name}</h3>
      <label>Type:</label> {properties?.type}
      <br />
      <label>Length:</label> {formattedRoadLength}
      <br />
      <label>From:</label> {properties?.fromStreet}
      <br />
      <label>To:</label> {properties?.toStreet}
    </div>
  );
};

export default Popup;

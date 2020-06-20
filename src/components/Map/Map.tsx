import React, { useRef, useEffect } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';

import './_map.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const TRAILS_AND_SIDEWALKS_SOURCE = 'trails-and-sidewalks';
const TRAILS_AND_SIDEWALKS_LAYER = 'trails-and-sidewalks-layer';
const BIKE_RACKS_SOURCE = 'bike-racks';
const BIKE_RACKS_LAYER = 'bike-racks-layer';

const App: React.SFC = () => {
  const mapRef = useRef<Map | null>();
  const mapContainerRef = useRef<HTMLDivElement>(document.createElement('div'));

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-104.991531, 39.742043],
      zoom: 14,
    })
      .addControl(new mapboxgl.NavigationControl(), 'bottom-right')
      .on('load', async () => {
        mapRef?.current
          ?.addSource(TRAILS_AND_SIDEWALKS_SOURCE, {
            type: 'vector',
            url: 'mapbox://laneysmith.dn1gfz6n',
          })
          ?.addSource(BIKE_RACKS_SOURCE, {
            type: 'vector',
            url: 'mapbox://laneysmith.ae4nief3',
          })
          .addLayer({
            id: TRAILS_AND_SIDEWALKS_LAYER,
            source: TRAILS_AND_SIDEWALKS_SOURCE,
            'source-layer': 'trails_and_sidewalks-6worzh',
            type: 'line',
            paint: {
              'line-color': '#e7185a',
              'line-width': 3,
              'line-opacity': 0.5,
            },
          })
          .addLayer(
            {
              id: BIKE_RACKS_LAYER,
              source: BIKE_RACKS_SOURCE,
              'source-layer': 'bike_racks-38osxw',
              type: 'circle',
              paint: {
                'circle-color': '#4ae385',
                'circle-radius': {
                  base: 1.75,
                  stops: [
                    [12, 2],
                    [22, 180],
                  ],
                },
                'circle-stroke-color': '#239a50',
                'circle-stroke-width': 1,
              },
            },
            'waterway-label'
          );
      });

    return (): void => mapRef?.current?.remove();
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default App;

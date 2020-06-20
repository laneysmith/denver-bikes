import React, { useRef, useEffect } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';

import './_map.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const TRAILS_AND_SIDEWALKS_SOURCE = 'trails-and-sidewalks';
const TRAILS_AND_SIDEWALKS_LAYER = 'trails-and-sidewalks-layer';
const BIKE_RACKS_SOURCE = 'bike-racks';
const BIKE_RACKS_CLUSTERS_LAYER = 'bike-racks-clusters-layer';
const BIKE_RACKS_CLUSTER_COUNT_LAYER = 'bike-racks-cluster-count-layer';
const BIKE_RACKS_UNCLUSTERED_POINT_LAYER = 'bike-racks-unclustered-point-layer';

const App: React.SFC = () => {
  const mapRef = useRef<Map | null>();
  const mapContainerRef = useRef<HTMLDivElement>(document.createElement('div'));

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-104.995531, 39.742043],
      zoom: 12,
    })
      .addControl(new mapboxgl.NavigationControl(), 'bottom-right')
      .on('load', async () => {
        mapRef?.current
          ?.addSource(TRAILS_AND_SIDEWALKS_SOURCE, {
            type: 'vector',
            url: 'mapbox://laneysmith.dn1gfz6n',
          })
          ?.addSource(BIKE_RACKS_SOURCE, {
            type: 'geojson',
            data:
              'https://gist.githubusercontent.com/laneysmith/4fd9d229d83daafa57b6e7b2c86c0570/raw/eca450bff763bf55f0176d00ef16dc7b961621de/denver_bike_racks.geojson',
            generateId: true,
            cluster: true,
            clusterMaxZoom: 13,
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
              id: BIKE_RACKS_CLUSTERS_LAYER,
              source: BIKE_RACKS_SOURCE,
              type: 'circle',
              filter: ['has', 'point_count'],
              paint: {
                'circle-color': '#51bbd6',
                'circle-opacity': 0.9,
                'circle-radius': ['step', ['get', 'point_count'], 10, 10, 20, 50, 30],
              },
            },
            'waterway-label'
          )
          .addLayer({
            id: BIKE_RACKS_CLUSTER_COUNT_LAYER,
            source: BIKE_RACKS_SOURCE,
            type: 'symbol',
            filter: ['has', 'point_count'],
            layout: {
              'text-field': '{point_count_abbreviated}',
              'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
              'text-size': 12,
            },
          })
          .addLayer({
            id: BIKE_RACKS_UNCLUSTERED_POINT_LAYER,
            source: BIKE_RACKS_SOURCE,
            type: 'circle',
            filter: ['!', ['has', 'point_count']],
            paint: {
              'circle-color': '#11b4da',
              'circle-radius': 4,
              'circle-stroke-width': 1,
              'circle-stroke-color': '#fff',
            },
          });
      });

    return (): void => mapRef?.current?.remove();
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default App;

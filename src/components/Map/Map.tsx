import React, { useRef, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl, { Map, Popup as PopupType } from 'mapbox-gl';

import { COLOR_MAP, Color } from '../../constants';
import { Popup } from '../Popup';

import './_map.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const BIKE_FACILITIES_SOURCE = 'bike-facilities';
const BIKE_FACILITIES_LAYER = 'bike-facilities-layer';
const BIKE_RACKS_SOURCE = 'bike-racks';
const BIKE_RACKS_CLUSTERS_LAYER = 'bike-racks-clusters-layer';
const BIKE_RACKS_CLUSTER_COUNT_LAYER = 'bike-racks-cluster-count-layer';
const BIKE_RACKS_UNCLUSTERED_POINT_LAYER = 'bike-racks-unclustered-point-layer';

const App: React.FC = () => {
  const mapRef = useRef<Map | null>();
  const mapContainerRef = useRef<HTMLDivElement>(document.createElement('div'));
  const popUpRef = useRef<PopupType>(new mapboxgl.Popup({ offset: 15, closeButton: false }));
  const TypeColorFlatMap = useMemo(() => Object.entries(COLOR_MAP).flat(), []);

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-104.95463, 39.742043],
      zoom: 12,
    })
      .addControl(new mapboxgl.NavigationControl(), 'bottom-right')
      .on('load', async () => {
        mapRef?.current
          ?.addSource(BIKE_FACILITIES_SOURCE, {
            type: 'vector',
            url: 'mapbox://laneysmith.8icxakkj',
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
            id: BIKE_RACKS_CLUSTERS_LAYER,
            source: BIKE_RACKS_SOURCE,
            type: 'circle',
            filter: ['has', 'point_count'],
            paint: {
              'circle-color': Color.Blue,
              'circle-opacity': 0.7,
              'circle-radius': ['step', ['get', 'point_count'], 10, 10, 20, 50, 30],
              'circle-stroke-width': 1,
              'circle-stroke-color': Color.White,
              'circle-stroke-opacity': 0.8,
            },
          })
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
              'circle-color': Color.Blue,
              'circle-radius': 4,
              'circle-stroke-width': 1,
              'circle-stroke-color': Color.White,
            },
          })
          .addLayer(
            {
              id: BIKE_FACILITIES_LAYER,
              source: BIKE_FACILITIES_SOURCE,
              'source-layer': 'existing_denver_bike_faciliti-dhoves',
              type: 'line',
              layout: {
                'line-cap': 'round',
                'line-join': 'bevel',
              },
              paint: {
                'line-width': ['interpolate', ['exponential', 10], ['zoom'], 12, 4, 13, 6],
                'line-color': ['match', ['get', 'type'], ...TypeColorFlatMap, Color.Grey],
              },
            },
            'road-label'
          )
          .on('mouseenter', BIKE_FACILITIES_LAYER, (e) => {
            if (e.features && e.features.length && mapRef.current) {
              mapRef.current.getCanvas().style.cursor = 'pointer';
            }
          })
          .on('mouseleave', BIKE_FACILITIES_LAYER, () => {
            if (mapRef.current) {
              mapRef.current.getCanvas().style.cursor = '';
            }
            popUpRef.current.remove();
          })
          .on('mouseover', BIKE_FACILITIES_LAYER, (e) => {
            if (e.features && e.features.length) {
              const { lat, lng } = e.lngLat;
              const feature = e.features[0];
              const popupNode = document.createElement('div');
              ReactDOM.render(<Popup feature={feature} />, popupNode);
              if (mapRef.current) {
                popUpRef.current
                  .setLngLat([lng, lat])
                  .setDOMContent(popupNode)
                  .addTo(mapRef.current);
              }
            }
          });
      });

    return (): void => mapRef?.current?.remove();
  }, [TypeColorFlatMap]);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default App;

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import SpatialReference from '@arcgis/core/geometry/SpatialReference.js';
import TileInfo from '@arcgis/core/layers/support/TileInfo.js';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer.js';
import { GoToLocation } from '../App';

interface Props {
  basemap: string
  layer: string
  location: GoToLocation
}

const ArcgisMapview: React.FC<Props> = ({ basemap, layer, location }) => {
  const mapViewRef = useRef<MapView | null>(null);
  const mapRef = useRef(null);
  const [mapView, setMapView] = useState<MapView|undefined>(undefined);

  const MIN_ZOOM = 4;

  useEffect(() => {
    if (mapRef.current && mapView && mapView.map) {
      mapView.map.set('basemap', basemap)
    }
  }, [basemap, mapView]);

  useEffect(() => {
    if (mapRef.current && mapView && mapView.map) {
      mapView.map.removeAll();
      if (layer.length > 0) {
        try {
          mapView.map.add(new FeatureLayer({ url: layer}));
        } catch (err) {
          console.error(err)
        }
      }
    }
  }, [layer, mapView]);

  useEffect(() => {
    if (location.latitude && location.longitude && location.zoom) {
      mapView.goTo({
        center: [location.longitude, location.latitude],
        zoom: location.zoom
      })
    }
  }, [location, mapView])

  useEffect(() => {
    if (mapRef.current) {
      // Create map
      const map = new Map({
        basemap
      });

      // Create view
      const view = new MapView({
        container: mapRef.current,
        map,
        constraints: {
          lods: TileInfo.create({
            spatialReference: SpatialReference.WGS84,
          }).lods,
          minZoom: MIN_ZOOM,
        },
        background: {
          color: [255, 252, 244, 0.5],
        },
      });

      mapViewRef.current = view;
      setMapView(view);
    }

    return () => {
      if (mapViewRef.current) {
        if (typeof mapViewRef.current.destroy === 'function') {
          mapViewRef.current.destroy();
        }
      }
    };
  }, []);

  return <div className="map-view" ref={mapRef} />;
};

export default ArcgisMapview;

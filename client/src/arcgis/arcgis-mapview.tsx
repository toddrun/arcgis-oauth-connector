import React, { useRef, useEffect, useState, useMemo } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import SpatialReference from '@arcgis/core/geometry/SpatialReference.js';
import TileInfo from '@arcgis/core/layers/support/TileInfo.js';
import Basemap from '@arcgis/core/Basemap';
import esriConfig from '@arcgis/core/config';

export interface Extents {
  latitude: number,
  longitude: number,
  zoom: number,
  searchZoom: number,
  initialZoom: number,
}

export interface MapPlugin {
  extendMap?: (mapView: MapView, deckLayer?: any) => void,
  shouldRerender?: (mapView: MapView) => boolean,
  onChange?: (mapView: MapView) => void,
}

interface Props {
  extents?: Extents,
  plugins?: MapPlugin[],
}

const ArcgisMapview: React.FC<Props> = ({  plugins = [],}) => {
  const mapViewRef = useRef<MapView | null>(null);
  const mapRef = useRef(null);
  const [mapView, setMapView] = useState<MapView|undefined>(undefined);
  const allPlugins = useMemo(() => ([...plugins]), [plugins]);

  const MIN_ZOOM = 4;

  useEffect(() => {
    if (mapRef.current) {

      const basemap = new Basemap({
        style: {
          id: "arcgis/outdoor",
        }
      });

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
        center: { type: 'point', latitude: 45.0, longitude: -122.5 },
        background: {
          color: [255, 252, 244, 0.5],
        },
      });
      // allPlugins.forEach((plugin) => {
      //   plugin.extendMap?.(view, undefined);
      // });

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

  useEffect(() => {
    if (mapView) {
      console.log("@@ @arcgis-mapview | refreshing Map")
      // Check with plugins to update the maps Layers. If any plugin wants to update the layers
      // set the layers property on the map. This prevents excessive re-rendering of the map
      // const pluginsWantingRerender = allPlugins
      //   .filter((p) => !!p.shouldRerender?.(mapView));
      // if (pluginsWantingRerender.length > 0) {
      //   applyLayers(mapView);
      // }
    }
  }, [allPlugins, mapView]);

  return <div className="map-view" ref={mapRef} />;
};

const applyLayers = (
  mapView: MapView,
) => {
  // const currDeckLayer = mapView?.map.layers.filter((layer) => 'deck' in layer).getItemAt(0);
  // mapView.map.layers.removeMany([currDeckLayer]);
  // mapView?.map.addMany([currDeckLayer], 0);
};

export default ArcgisMapview;

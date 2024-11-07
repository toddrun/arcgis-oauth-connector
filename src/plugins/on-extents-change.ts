
import MapView from '@arcgis/core/views/MapView';
import * as webMercatorUtils from '@arcgis/core/geometry/support/webMercatorUtils';
import { DeckLayer } from '@deck.gl/arcgis';
import { Bounds, MAX_LATLNG, MIN_ZOOM, MapPlugin, Point } from '../map/arcgis-types';

const OnExtentsChange = (
  callback: (center: Point, zoom: number, bounds: Bounds) => void,
): MapPlugin => ({
  extendMap: (mapView) => {
    let previousExtent = mapView.extent;

    mapView.watch('updating', () => {
      if (mapView.updating || mapView.zoom < MIN_ZOOM) return;
      const { center, zoom, extent } = mapView;

      if (previousExtent === extent) return;
      previousExtent = extent;

      const bounds = calculateBounds(extent, zoom);
      const centerPoint = latLng(center.latitude, center.longitude);

      callback(centerPoint, zoom, bounds);
    });
  },
});

const latLng = (lat: number, lng: number): Point => ({
  lat: () => +lat.toFixed(6),
  lng: () => +lng.toFixed(6),
});


export const calculateBounds = (extent: any, zoom: number): Bounds => {
  if (zoom === MIN_ZOOM) {
    return {
      getSouthWest: () => latLng(-MAX_LATLNG, -MAX_LATLNG),
      getNorthEast: () => latLng(MAX_LATLNG, MAX_LATLNG),
    };
  }

  return {
    getSouthWest: () => latLngFromMercator(extent.xmin, extent.ymin),
    getNorthEast: () => latLngFromMercator(extent.xmax, extent.ymax),
  };
};

export const latLngFromMercator = (x: number, y: number): Point => {
  let [lng, lat] = webMercatorUtils.xyToLngLat(x, y);

  // Limit longitude and latitude within valid ranges
  lng = Math.min(Math.max(lng, -180), 180);
  lat = Math.min(Math.max(lat, -90), 90);

  return latLng(lat, lng);
};

export default OnExtentsChange;
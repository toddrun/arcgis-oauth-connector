import MapView from "@arcgis/core/views/MapView";
import { DeckLayer } from '@deck.gl/arcgis';

export const MIN_ZOOM = 4;
export const MAX_LATLNG = 180;

export interface Point {
  lat: () => number,
  lng: () => number,
}

export interface Bounds {
  getSouthWest: () => Point,
  getNorthEast: () => Point,
}

export interface MapPlugin {
  extendMap?: (mapView: MapView, deckLayer?: DeckLayer) => void,
  shouldRerender?: (mapView: MapView) => boolean,
  onChange?: (mapView: MapView) => void,
}
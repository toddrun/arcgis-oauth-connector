import MapView from "@arcgis/core/views/MapView";
import ArcGisConnection, { DEFAULT_PORTAL_URL } from "./arcgis-connection";
import { FOCUS_LOCATION } from "./App";

export interface LayerSetting {
  id: string;
  title: string;
  esriApiKey: string; // isOnline ? undefined : '',
  esriAppId: string; // isOnline ? undefined : appId,
  esriPortalUrl: string; // isOnline ? undefined : portalUrl,
  baseURL: string;
}

const loadLayer = (layer: LayerSetting) => {
  const { id, esriApiKey, esriAppId, esriPortalUrl, baseURL } = layer;
  const isOnline = !layer.esriPortalUrl; // We don't set this for agol

  const connection = isOnline ?
    ArcGisConnection(esriApiKey, esriAppId, DEFAULT_PORTAL_URL) :
    ArcGisConnection(esriApiKey, esriAppId, esriPortalUrl);

    return connection.fetchLayer(id, baseURL);
}

const ArcGISLayerLoader = (mapView: MapView) => {
  const loadAll = (payload: LayerSetting[]) => {
    Promise.all(payload.map(loadLayer)).then((loadedLayers) => {
      mapView.map.layers.removeAll();
      mapView.map.addMany(loadedLayers);
      mapView.goTo({center: FOCUS_LOCATION});
    });
  }
  
  return { loadAll }
};

export default ArcGISLayerLoader;

import { DEFAULT_PORTAL_URL } from "./arcgis-connection";

import esriConfig from '@arcgis/core/config';
import Portal from '@arcgis/core/portal/Portal';
import PortalQueryParams from '@arcgis/core/portal/PortalQueryParams';

const ArcGisLayerIds = (connection, esriApiKey, portalUrl) => {
  const isOnline = portalUrl === DEFAULT_PORTAL_URL;

  const prepareGlobalSettings = () => {
    if (isOnline) {
      return esriConfig.apiKey = '';
    }
    return esriConfig.portalUrl = portalUrl;
  };

  const resetGlobalSettings = () => {
    if (isOnline) {
      return esriConfig.apiKey = esriApiKey;
    }
    return esriConfig.portalUrl = DEFAULT_PORTAL_URL;
  };

  const fetchLayerIds = async () => {
    prepareGlobalSettings();

    const portal = new Portal();
    portal.authMode = 'immediate';
    await portal.load();

    const { user: { orgId } } = portal;

    const queryParams = new PortalQueryParams({
      query: `(type:"Feature Service") AND (orgid:${orgId})`,
      sortField: 'num-views',
      sortOrder: 'desc',
      num: 10
    });

    const response = await portal.queryItems(queryParams) || { total: 0, results: [] };

    if (response.results.length > 0) {
      return { total: response.total, layers: response.results.map((layer) => layer.id) };
    }

    return { total: response.total, layers: [] };
  }

  return { fetchLayerIds }
}

export default ArcGisLayerIds;

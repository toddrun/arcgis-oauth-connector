import { DEFAULT_PORTAL_URL } from "./arcgis-connection";
import esriConfig from '@arcgis/core/config';
import Portal from '@arcgis/core/portal/Portal';
import PortalQueryParams from '@arcgis/core/portal/PortalQueryParams';
import { LayerSetting } from "./arcgis-layer-loader";

const ArcGisLayerInfos = (esriApiKey, appId, portalUrl) => {
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

  const fetchLayerInfos = async () => {
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

    resetGlobalSettings();

    return response.results.length > 0 ? response.results.map((layer): LayerSetting => {
      console.log("Loading the stuff", appId, portalUrl)
      return {
        id: layer.id,
        title: layer.title,
        esriApiKey,
        esriAppId: appId,
        esriPortalUrl: portalUrl,
        baseURL: layer.itemUrl,
      }
    }) : [];
  }

  return { fetchLayerInfos }
}

export default ArcGisLayerInfos;

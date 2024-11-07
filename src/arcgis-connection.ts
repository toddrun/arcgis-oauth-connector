import ArcGisLayer from '@arcgis/core/layers/Layer';
import esriConfig from '@arcgis/core/config';
import identityManager from '@arcgis/core/identity/IdentityManager';
import OAuthInfo from '@arcgis/core/identity/OAuthInfo';
import calculateWindowFeatures from './helpers/calculate-window-features';

export const DEFAULT_PORTAL_URL = 'https://www.arcgis.com';

const ArcGisConnection = (
  esriApiKey: string,
  appId: string,
  portalUrl: string,
) => {
  let credentials;

  const oAuthInfo = new OAuthInfo({
    appId,
    flowType: 'authorization-code',
    portalUrl,
    popup: true,
    popupCallbackUrl: process.env.PUBLIC_URL + "/oauth.html",
    popupWindowFeatures: calculateWindowFeatures(),
  });

  identityManager.registerOAuthInfos([oAuthInfo]);

  const isOnline = portalUrl === DEFAULT_PORTAL_URL;
  const sharingUrl = `${portalUrl}/sharing`;

  const getAuthToken = async (): Promise<string> => {
    esriConfig.apiKey = esriApiKey;
    credentials = await identityManager.getCredential(sharingUrl);

    return credentials?.token;
  };

  const fetchLayer = async (layerId: string, baseURL: string): Promise<ArcGisLayer> => {
    const token = await getAuthToken();

    // This is the line that we have trouble with in Fulcrum
    esriConfig.apiKey = isOnline ? '' : esriApiKey;

    return ArcGisLayer.fromPortalItem({
      portalItem: {
        id: layerId,
        apiKey: token,
        // @ts-ignore
        portal: {
          url: baseURL,
        },
      },
    });
  };

  return { fetchLayer, getAuthToken };
};

export default ArcGisConnection;

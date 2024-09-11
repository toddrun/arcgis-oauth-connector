import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ArcGisConnection, { DEFAULT_PORTAL_URL } from './arcgis/arcgis-connection';
import ArcGisLayerIds from './arcgis/arcgis-layer-ids';
import esriConfig from '@arcgis/core/config';

interface Props {
  setApiKey: (apiKey: string) => void
}

const Sidebar = ({ setApiKey }: Props) => {

  const [esriApiKey, setEsriApiKey] = useState('');
  const [onlineAppId, setOnlineAppId] = useState('');
  const [enterpriseAppId, setEnterpriseAppId] = useState('');
  const [enterprisePortalUrl, setEnterprisePortalUrl] = useState('');
  const [onlineAuthToken, setOnlineAuthToken] = useState('');

  useEffect(() => {
    esriConfig.apiKey = esriApiKey
    console.log("Set to", esriApiKey)
    setApiKey(esriApiKey);
  }, [esriApiKey])

  const buildEntryItem = (label: string, value: string, setter: Dispatch<SetStateAction<string>>) => (
    <div className='entry-item'>
      <input value={value} onChange={(e) => setter(e.target.value)}/><label>{label}</label>
    </div>
  );

  const canConnectToOnline = () => {
    return esriApiKey && onlineAppId;
  }

  const canConnectToEnterprise = () => {
    return esriApiKey && enterpriseAppId && enterprisePortalUrl;
  }
  
  const connectToOnline = async () => {
    const connection = ArcGisConnection(esriApiKey, onlineAppId, DEFAULT_PORTAL_URL);
    const authToken = await connection.getAuthToken();
    console.log("Here we be");
    console.log("Online Layer Ids", ArcGisLayerIds(connection, esriApiKey, DEFAULT_PORTAL_URL));
    setOnlineAuthToken(authToken);
  }

  const connectToEnteprise = async () => {
    const connection = ArcGisConnection(esriApiKey, enterpriseAppId, enterprisePortalUrl);
    const authToken = await connection.getAuthToken();
    console.log("We're in business!");
    console.log("Enterprise Layer Ids", ArcGisLayerIds(connection, esriApiKey, enterprisePortalUrl));
    setOnlineAuthToken(authToken);
  }

  const connectButton = (connectFunction, type) => (
    <button onClick={connectFunction}>Connect to {type}!</button>
  )

  const submitButton = () => {
    if (esriApiKey) {
      return (
        <div className='submit-button'>
          <button onClick={() => console.log(esriApiKey)}>Connect!</button>
        </div>
      )
    }
    return undefined;
  }

  return (
    <div  className="sidebar">
      { buildEntryItem("Esri Api Key", esriApiKey, setEsriApiKey) }
      { buildEntryItem("Online App ID", onlineAppId, setOnlineAppId) }
      { buildEntryItem("Enterprise App ID", enterpriseAppId, setEnterpriseAppId) }
      { buildEntryItem("Enterprise Portal URL", enterprisePortalUrl, setEnterprisePortalUrl) }
      <br />
      { canConnectToOnline() && connectButton(connectToOnline, 'Online') }
      { canConnectToEnterprise() && connectButton(connectToEnteprise, 'Enterprise') }
      { canConnectToOnline() && canConnectToEnterprise() && submitButton() }
    </div>
  );
};

export default Sidebar;

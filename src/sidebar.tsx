import React, { Dispatch, SetStateAction, useState } from 'react';
import ArcGisConnection, { DEFAULT_PORTAL_URL } from './arcgis-connection';
import ArcGisLayerInfos from './arcgis-layer-infos';
import esriConfig from '@arcgis/core/config';

interface Props {
  esriApiKey: string,
  setEsriApiKey: (key: string) => void;
  setLoadedLayers: (layers: any[]) => void;
}

const Sidebar: React.FC<Props> = ({esriApiKey, setEsriApiKey, setLoadedLayers}) => {
  const [localApiKey, setLocalApiKey] = useState(esriApiKey);
  const [onlineAppId, setOnlineAppId] = useState('');
  const [enterpriseAppId, setEnterpriseAppId] = useState('');
  const [enterprisePortalUrl, setEnterprisePortalUrl] = useState('');
  const [onlineAuthToken, setOnlineAuthToken] = useState('');
  const [enterpriseAuthToken, setEnterpriseAuthToken] = useState('');
  const [onlineLayers, setOnlineLayers] = useState([]);
  const [enterpriseLayers, setEnterpriseLayers] = useState([]);
  const [selectedOnlineLayers, setSelectedOnlineLayers] = useState([]);
  const [selectedEnterpriseLayers, setSelectedEnterpriseLayers] = useState([]);

  const initEsriApiKey = () => {
    esriConfig.apiKey = localApiKey
    setEsriApiKey(localApiKey)
  }

  const buildApiKeyItem = () => (
    <div className='entry-item api-key'>
      <input
        value={localApiKey}
        onChange={(e) => setLocalApiKey(e.target.value)}
        onBlur={initEsriApiKey}
      />
      <label>"Esri Api Key"</label>
    </div>
  );

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
    const layers = await ArcGisLayerInfos(esriApiKey, onlineAppId, DEFAULT_PORTAL_URL).fetchLayerInfos();
    setOnlineAuthToken(authToken);
    setOnlineLayers(layers);
  }

  const connectToEnteprise = async () => {
    const connection = ArcGisConnection(esriApiKey, enterpriseAppId, enterprisePortalUrl);
    const authToken = await connection.getAuthToken();
    const layers = await ArcGisLayerInfos(esriApiKey, enterpriseAppId, enterprisePortalUrl).fetchLayerInfos();
    setEnterpriseAuthToken(authToken);
    setEnterpriseLayers(layers);
  }

  const connectButton = (connectFunction, type) => {
    const authToken = type === 'Online' ? onlineAuthToken : enterpriseAuthToken;

    return <button onClick={connectFunction} disabled={!!authToken}>Connect to {type}!</button>
  }

  const updateSelectedLayers = (layerId, selectedLayers, setSelectedLayers) => {
    const layers = [...selectedLayers]
    const position = layers.indexOf(layerId);

    position < 0 ? layers.push(layerId) : layers.splice(position, 1);
    setSelectedLayers(layers);
  }

  const renderLayerList = (layers, type) => {
    if (layers.length === 0) {
      return <div>&nbsp;</div>;
    }

    const selectedLayers = type === 'Online' ? selectedOnlineLayers : selectedEnterpriseLayers;
    const setSelectedLayers = type === 'Online' ? setSelectedOnlineLayers : setSelectedEnterpriseLayers;

    // Render the first 5 only
    return <ul>
      { layers?.slice(0, 5)?.map((layer) => (
          <li key={layer.id} className="layer">
            <input
              type="checkbox"
              onChange={
                () => updateSelectedLayers(layer.id, selectedLayers, setSelectedLayers)
              }>
            </input>
            {layer.title}
          </li>
      ))}
    </ul>
  }

  const buttonText = (selectedLayers, type) => {
    const len = selectedLayers.length;
    const layers = len > 1 ? "layers" : "layer";
    return len > 0 ? `${len} ${type} ${layers}` : undefined;
  }

  const getSelectedLayers = (selectedLayers, fullLayers) => (
    selectedLayers.map((id) => {
      return fullLayers.find((layer) => layer.id === id);
    })
  )

  const sendLoadedLayers = () => {
    setLoadedLayers([
      ...getSelectedLayers(selectedOnlineLayers, onlineLayers),
      ...getSelectedLayers(selectedEnterpriseLayers, enterpriseLayers)
    ])
  }

  const loadLayersButton = () => {
    const textParts = [];
    const onlineText = buttonText(selectedOnlineLayers, 'Online');
    const enterpriseText = buttonText(selectedEnterpriseLayers, 'Enterprise');
    if (onlineText) {
      textParts.push(onlineText)
    }
    if (enterpriseText) {
      textParts.push(enterpriseText)
    }

    return <div className='submit-button'>
      <button onClick={sendLoadedLayers}>Load {textParts.join(" and ")}</button>
    </div>
  };

  return (
    <div  className="sidebar">
      { buildApiKeyItem() }
      { buildEntryItem("Online App ID", onlineAppId, setOnlineAppId) }
      { buildEntryItem("Enterprise App ID", enterpriseAppId, setEnterpriseAppId) }
      { buildEntryItem("Enterprise Portal URL", enterprisePortalUrl, setEnterprisePortalUrl) }
      <br />
      { esriApiKey &&
        <table>
          <thead>
            <tr>
              <th className={"half-column"} >Online</th>
              <th className={"half-column"} >Enterprise</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ canConnectToOnline() && connectButton(connectToOnline, 'Online') }</td>
              <td>{ canConnectToEnterprise() && connectButton(connectToEnteprise, 'Enterprise') }</td>
            </tr>
            <tr>
              <td>{ renderLayerList(onlineLayers, 'Online')}</td>
              <td>{ renderLayerList(enterpriseLayers, 'Enterprise')}</td>
            </tr>
          </tbody>
        </table>
      }
      
      <ul style={{display: 'none'}}>
        { selectedOnlineLayers.map((layer) => (<li key='selectedOnlineLayers' className={"layer"}>{layer} (agol)</li>))}
        { selectedEnterpriseLayers.map((layer) => (<li key='selectedEnterpriseLayers'  className={"layer"}>{layer} (ent)</li>))}
      </ul>

      {
        (selectedOnlineLayers.length > 0 || selectedEnterpriseLayers.length > 0)
          && loadLayersButton()
      }
    </div>
  );
};

export default Sidebar;

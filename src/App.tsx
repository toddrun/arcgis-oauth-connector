import React, { useEffect, useState } from 'react';
import identityManager from '@arcgis/core/identity/IdentityManager';
import Sidebar from './sidebar';
import MainView from './main-view';
import './style.css';
import { LayerSetting } from './arcgis-layer-loader';

export const FOCUS_LOCATION = [-106.534, 38.794];

export const App: React.FC = () => {
  const [loadedLayers, setLoadedLayers] = useState<LayerSetting[]>([]);
  const [esriApiKey, setEsriApiKey] = useState('');

  useEffect(() => {
    identityManager.destroyCredentials();
  }, []);

  return (
    <div className="App">
      <div className="content">
        <Sidebar esriApiKey={esriApiKey} setEsriApiKey={setEsriApiKey} setLoadedLayers={setLoadedLayers} />
        { esriApiKey && <MainView loadedLayers={loadedLayers} /> }
      </div>
    </div>
  );
};

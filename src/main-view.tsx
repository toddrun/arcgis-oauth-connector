import React from 'react';
import ArcgisMapview from './map/arcgis-mapview';
import { Bounds } from './map/arcgis-types';
import { LayerSetting } from './arcgis-layer-loader';

interface MainViewState {
  selectedRecordId: number;
  requestUpdateLayers: boolean;
  center: number;
  zoom: number;
  bounds: Bounds;
}

interface Props {
  loadedLayers: LayerSetting[];
}

const MainView: React.FC<Props> = ({loadedLayers}) => {
  const plugins = []
  return (
    <main className="main-view">
      <ArcgisMapview plugins={plugins} loadedLayers={loadedLayers} />
    </main>
  );
};

export default MainView;

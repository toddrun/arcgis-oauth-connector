import React, { useEffect } from 'react';
import ArcgisMapview from './arcgis/arcgis-mapview';
import { GoToLocation } from './App';

interface Props {
  basemap: string
  layer: string
  location: GoToLocation
}

const MainView: React.FC<Props> = ({ basemap, layer, location }) => (
  <main className="main-view">
    <ArcgisMapview basemap={basemap} layer={layer} location={location} />
  </main>
);


export default MainView;
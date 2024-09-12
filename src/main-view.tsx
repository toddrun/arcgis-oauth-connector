import React, { useEffect } from 'react';
import ArcgisMapview from './arcgis/arcgis-mapview';

interface Props {
  basemap: string
}

const MainView: React.FC<Props> = ({ basemap }) => {
  return (
      <main className="main-view">
        <ArcgisMapview basemap={basemap} />
      </main>
    );
}

export default MainView;
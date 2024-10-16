import React from 'react';
import Basemaps from './functions/basemaps';
import Layers from './functions/layers';
import GoTo from './functions/go-to';
import { GoToLocation } from './App';

interface Props {
  basemap: string,
  setBasemap: (string) => void
  layer: string,
  setLayer: (string) => void
  location: GoToLocation,
  setLocation: (GoToLocation) => void
}

const Sidebar: React.FC<Props> = ({basemap, setBasemap, layer, setLayer, location, setLocation}) => (
  <div  className="sidebar">
    <Basemaps basemap={basemap} setBasemap={setBasemap} />
    <hr />
    <Layers layer={layer} setLayer={setLayer} />
    <hr />
    <GoTo location={location} setLocation={setLocation}/>
  </div>
);

export default Sidebar;

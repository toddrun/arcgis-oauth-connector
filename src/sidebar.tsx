import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ArcGisConnection, { DEFAULT_PORTAL_URL } from './arcgis/arcgis-connection';
import ArcGisLayerIds from './arcgis/arcgis-layer-ids';

interface Props {
  basemap: string,
  setBasemap: (string) => void
}

const Sidebar: React.FC<Props> = ({basemap, setBasemap}) => {
  const [localValue, setLocalValue] = useState(basemap)

  return (
    <div  className="sidebar">
      <div className='entry-item'>
        <label>Basemap:</label><input value={localValue} onChange={(e) => setLocalValue(e.target.value)} />
        <button onClick={() => setBasemap(localValue)}>Select</button>
      </div>
      <div>
        Free:<ul>
          <li>satellite</li>
          <li>topo</li>
          <li>streets</li>
          <li>dark-gray"</li>
        </ul>
        Paid:<ul>
          <li>arcgis/navigation</li>
          <li>Anything else from https://developers.arcgis.com/rest/basemap-styles/</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

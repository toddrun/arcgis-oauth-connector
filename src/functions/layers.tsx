import { useState } from "react";
import Link from "../utils/link";

interface LayerProps {
  layer: string,
  setLayer: (string) => void
}

const Layers: React.FC<LayerProps> = ({ layer, setLayer}) => { 
  const [localValue, setLocalValue] = useState(layer)

  return(
    <div>
      <h2>Layers</h2>
      <div className='entry-item'>
        <input value={localValue} onChange={(e) => setLocalValue(e.target.value)} />
        <button onClick={() => setLayer(localValue)}>Go</button>
      </div>
      <div>Public Feature Service urls work, for example try these:</div>
      <ul className='shrink-me'>
        <li>
          <Link 
            url="https://services2.arcgis.com/Uq9r85Potqm3MfRV/arcgis/rest/services/biosds1598_fpu/FeatureServer/0"
            label="House Wren Range"
          />
        </li>
        <li>
          <Link 
            url="https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_Flood_Hazard_Reduced_Set_gdb/FeatureServer"
            label="USA Flood Hazard Reduced Set"
          />
        </li>
        <li>
          <Link 
            url="https://gis.blm.gov/azarcgis/rest/services/lands/BLM_AZ_SMA/FeatureServer/0"
            label="Arizona Bureau of Land Managment Areas Data Set"
          />
        </li>
      </ul>
      <div>
        But ask for an
        <Link 
          url="https://services8.arcgis.com/lDMeEAPoyyEO5Lqb/arcgis/rest/services/California_Land_Ownership/FeatureServer" 
          label="AGOL Layer" />
        <span> and you'll need to login</span>
        </div>
    </div>
  )
}

export default Layers;
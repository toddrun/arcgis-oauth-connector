import { useState } from "react";
import Link from "../utils/link";

interface BasemapProps {
  basemap: string,
  setBasemap: (string) => void
}
const Basemaps: React.FC<BasemapProps> = ({ basemap, setBasemap}) => { 
  const [localValue, setLocalValue] = useState(basemap)

  return(
    <div>
      <h2>Basemaps</h2>
      <div className='entry-item'>
        <input value={localValue} onChange={(e) => setLocalValue(e.target.value)} />
        <button onClick={() => setBasemap(localValue)}>Go</button>
      </div>
      <div>
        <Link 
          url="https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap" 
          label="Free basemaps"/>
        <span> can be used without an API key, including:</span>
        <ul>
          <li>satellite</li>
          <li>topo-3d</li>
          <li>streets</li>
        </ul>
        <Link 
          url="https://developers.arcgis.com/rest/basemap-styles/" 
          label='"Real" basemaps' />
        <span> will require you to log in!</span>
      </div>
    </div>
  )
}

export default Basemaps;
import { useState } from "react";
import MainView from "./main-view";
import Sidebar from "./sidebar";
import GoTo from "./functions/go-to";

export interface GoToLocation {
  latitude?: number
  longitude?: number
  zoom?: number
}

function App() {
  const [basemap, setBasemap] = useState("topo")
  const [layer, setLayer] = useState("")
  const [location, setLocation] = useState({} as GoToLocation)

  return (
    <div className="App">
      <h1>Let's see what's available without being logged in!</h1>
      <div className="content">
        <Sidebar basemap={basemap} setBasemap={setBasemap} layer={layer} setLayer={setLayer} location={location} setLocation={setLocation} />
        <MainView basemap={basemap} layer={layer} location={location} />
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import MainView from "./main-view";
import Sidebar from "./sidebar";

function App() {
  const [basemap, setBasemap] = useState("topo")

  return (
    <div className="App">
      <div className="content">
        <Sidebar basemap={basemap} setBasemap={setBasemap} />
        <MainView basemap={basemap} />
      </div>
    </div>
  );
}

export default App;

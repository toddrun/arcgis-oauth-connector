import { useState } from "react";
import MainView from "./main-view";
import Sidebar from "./sidebar";

function App() {
  const [apiKey, setApiKey] = useState(undefined);

  return (
    <div className="App">
      <div className="content">
        <Sidebar setApiKey={setApiKey}/>
        <MainView apiKey={apiKey} />
      </div>
    </div>
  );
}

export default App;

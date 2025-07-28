import "./App.css";
import Graph from "./Graph/Graph.js";
import GraphSelect from "./Components/GraphSelect";
import { useContext } from "react";
import { AppContext } from "./AppContext";

function App() {
  const {currentFile} = useContext(AppContext);

  return (
    <div className="App">
      {!currentFile && (<GraphSelect />)}
      {currentFile && (<Graph />)}
    </div>
  );
}

export default App;

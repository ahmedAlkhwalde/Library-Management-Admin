import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return(
    <div className="App"> 
        <h1>Welcome to My React App</h1>
        <Outlet />
    </div>
  );
}

export default App;

import GameComponent from "./components/GameComponent";
import RegisterComponent from "./components/RegisterComponent";
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<RegisterComponent />} />
        <Route path="/game" element={<GameComponent />} />
      </Routes>
    </>
  );
}

export default App;

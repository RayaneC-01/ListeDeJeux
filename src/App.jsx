import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Game2048 from "./pages/Games2048";
import MemoryGame from "./pages/MemoryGame";
import ChronoPhrases from "./pages/ChronoPhrases.jsx";
import RushHour from "./pages/RushHour";

export default function App() {
  return (
    <Router basename="/ListeDeJeux">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/2048" element={<Game2048 />} />
        <Route path="/memory-game" element={<MemoryGame />} />
        <Route path="/chrono-phrases" element={<ChronoPhrases />} />
        <Route path="/rush-hour" element={<RushHour />} />
      </Routes>
    </Router>
  );
}

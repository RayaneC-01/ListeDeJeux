import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Game2048 from "./pages/Games2048";
import TicTacToe from "./pages/TicTacToe";
import MemoryGame from "./pages/MemoryGame";
export default function App() {
  return (
    <Router basename="/ListeDeJeux">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/2048" element={<Game2048 />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/memory-game" element={<MemoryGame />} />
      </Routes>
    </Router>
  );
}

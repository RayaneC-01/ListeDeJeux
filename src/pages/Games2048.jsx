import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, HelpCircle, RotateCcw } from "lucide-react";

// Taille de la grille
const GRID_SIZE = 4;

// Fonction utilitaire : génère une grille 4x4 remplie de 0
const createEmptyBoard = () => {
  return Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(0));
};

export default function Game2048() {
  // État du plateau de jeu (la matrice 4x4)
  const [board, setBoard] = useState(createEmptyBoard());

  // État pour le score actuel et le meilleur score
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  // Recommencer une nouvelle partie (reset de la grille)
  const resetGame = () => {
    setBoard(createEmptyBoard());
    setScore(0);
    setBestScore((prevBest) => Math.max(prevBest, score)); // Met à jour le meilleur score si nécessaire
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 flex flex-col items-center">
      {/* Barre de retour et titre */}
      <div className="w-full max-w-lg mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour</span>
        </Link>
        <h1 className="text-3xl font-black text-amber-400">2048</h1>
      </div>

      {/* En-tête des scores et bouton Recommencer */}
      <div className="w-full max-w-lg flex items-center justify-between mb-6">
        <button
          onClick={resetGame}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl flex items-center gap-2 transition-colors font-medium text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          Recommencer
        </button>

        <div className="flex gap-3">
          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-center min-w-[80px]">
            <p className="text-xs text-slate-400 font-semibold uppercase">
              Score
            </p>
            <p className="text-xl font-bold text-white">{score}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-center min-w-[80px]">
            <p className="text-xs text-slate-400 font-semibold uppercase">
              Meilleur
            </p>
            <p className="text-xl font-bold text-amber-400">{bestScore}</p>
          </div>
        </div>
      </div>

      {/* Règles rapides */}
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 p-4 rounded-xl mb-6 text-sm text-slate-300 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <p>
          Combines les tuiles identiques pour atteindre{" "}
          <strong className="text-amber-400">2048</strong> !
        </p>
      </div>

      {/* Zone de test temporaire pour afficher l'état de la grille */}
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center">
        <p className="text-xs text-slate-500 mb-2 font-mono">
          Modèle de données (board) :
        </p>
        <pre className="text-indigo-400 text-sm font-mono bg-slate-950 p-4 rounded-xl inline-block text-left">
          {JSON.stringify(board, null, 2)}
        </pre>
      </div>
    </div>
  );
}

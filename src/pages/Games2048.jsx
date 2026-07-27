import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, HelpCircle, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

const GRID_SIZE = 4;

const createEmptyBoard = () => {
  return Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(0));
};

const addRandomTile = (board) => {
  const emptyCells = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (board[r][c] === 0) emptyCells.push({ r, c });
    }
  }
  if (emptyCells.length === 0) return board;

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const newValue = Math.random() < 0.9 ? 2 : 4;

  const newBoard = board.map((row) => [...row]);
  newBoard[randomCell.r][randomCell.c] = newValue;
  return newBoard;
};

const createInitialBoard = () => {
  let board = createEmptyBoard();
  board = addRandomTile(board);
  board = addRandomTile(board);
  return board;
};

const getTileStyle = (value) => {
  switch (value) {
    case 2:    return "bg-slate-200 text-slate-900 font-bold";
    case 4:    return "bg-amber-100 text-slate-900 font-bold";
    case 8:    return "bg-amber-500 text-white font-bold";
    case 16:   return "bg-orange-500 text-white font-bold";
    case 32:   return "bg-orange-600 text-white font-bold";
    case 64:   return "bg-red-600 text-white font-bold";
    case 128:  return "bg-yellow-400 text-slate-900 font-extrabold";
    case 256:  return "bg-yellow-500 text-slate-900 font-extrabold";
    case 512:  return "bg-yellow-300 text-slate-900 font-extrabold";
    case 1024: return "bg-cyan-400 text-slate-900 font-extrabold";
    case 2048: return "bg-indigo-500 text-white font-black";
    default:   return "bg-slate-800 text-white font-bold";
  }
};

export default function Game2048() {
  const [board, setBoard] = useState(() => createInitialBoard());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [selectedCell, setSelectedCell] = useState(null);

  const startNewGame = () => {
    setBoard(createInitialBoard());
    setScore(0);
    setSelectedCell(null);
  };

  const handleCellClick = (r, c) => {
    if (board[r][c] !== 0) {
      setSelectedCell({ r, c });
    }
  };

  const moveSelectedTile = useCallback(
    (dirR, dirC, customCell = null) => {
      const activeCell = customCell || selectedCell;
      if (!activeCell) return;

      const { r, c } = activeCell;
      const targetR = r + dirR;
      const targetC = c + dirC;

      if (
        targetR < 0 ||
        targetR >= GRID_SIZE ||
        targetC < 0 ||
        targetC >= GRID_SIZE
      ) {
        return;
      }

      const currentVal = board[r][c];
      const targetVal = board[targetR][targetC];

      if (targetVal === 0 || targetVal === currentVal) {
        const newBoard = board.map((row) => [...row]);
        let addedScore = 0;

        if (targetVal === currentVal) {
          newBoard[targetR][targetC] = currentVal * 2;
          addedScore = currentVal * 2;
        } else {
          newBoard[targetR][targetC] = currentVal;
        }

        newBoard[r][c] = 0;
        const boardWithRandom = addRandomTile(newBoard);

        setBoard(boardWithRandom);
        setSelectedCell({ r: targetR, c: targetC });

        if (addedScore > 0) {
          setScore((s) => {
            const newScore = s + addedScore;
            setBestScore((prev) => Math.max(prev, newScore));
            return newScore;
          });
        }
      }
    },
    [selectedCell, board]
  );

  // Gestion du glisser (Drag) via Framer Motion pour Souris & Touch
  const handleDragEnd = (r, c, info) => {
    const minDistance = 20;
    const { x, y } = info.offset;

    if (Math.abs(x) > minDistance || Math.abs(y) > minDistance) {
      if (Math.abs(x) > Math.abs(y)) {
        moveSelectedTile(0, x > 0 ? 1 : -1, { r, c });
      } else {
        moveSelectedTile(y > 0 ? 1 : -1, 0, { r, c });
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowLeft":  moveSelectedTile(0, -1); break;
        case "ArrowRight": moveSelectedTile(0, 1);  break;
        case "ArrowUp":    moveSelectedTile(-1, 0); break;
        case "ArrowDown":  moveSelectedTile(1, 0);  break;
        default: break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveSelectedTile]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-md mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour</span>
        </Link>
        <h1 className="text-3xl font-black text-amber-400">2048 Custom</h1>
      </div>

      <div className="w-full max-w-md flex items-center justify-between mb-6">
        <button
          onClick={startNewGame}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl flex items-center gap-2 transition-colors font-medium text-sm border border-slate-700 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Recommencer
        </button>

        <div className="flex gap-3">
          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-center min-w-[75px]">
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Score
            </p>
            <p className="text-lg font-bold text-white">{score}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-center min-w-[75px]">
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Meilleur
            </p>
            <p className="text-lg font-bold text-amber-400">{bestScore}</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-3.5 rounded-xl mb-6 text-xs text-slate-300 flex items-start gap-2.5">
        <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <p>
          1. <strong>Glisse ou clique</strong> sur une tuile.<br />
          2. Fonctionne sur <strong>Mobile</strong>, <strong>Souris</strong> et <strong>Flèches</strong>.
        </p>
      </div>

      <div className="w-full max-w-md aspect-square bg-slate-900 border-2 border-slate-800 p-3 rounded-2xl grid grid-cols-4 gap-3 shadow-2xl touch-none">
        {board.map((row, r) =>
          row.map((value, c) => {
            if (value === 0) {
              return (
                <div
                  key={`cell-${r}-${c}`}
                  className="bg-slate-950/50 rounded-xl border border-slate-800/30"
                />
              );
            }

            const isSelected = selectedCell?.r === r && selectedCell?.c === c;
            const tileStyle = getTileStyle(value);

            return (
              <motion.div
                key={`cell-${r}-${c}`}
                layout
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, info) => handleDragEnd(r, c, info)}
                onClick={() => handleCellClick(r, c)}
                whileTap={{ scale: 0.95 }}
                className={`rounded-xl flex items-center justify-center text-xl md:text-2xl select-none cursor-pointer ${tileStyle} ${
                  isSelected ? "ring-4 ring-amber-400 shadow-lg shadow-amber-400/30 z-10" : ""
                }`}
              >
                {value}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
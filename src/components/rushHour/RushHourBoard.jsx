import { useRef } from "react";

export default function RushHourBoard({
  blocs,
  blocSelectionne,
  onSelectBloc,
  onMove,
}) {
  // Référence pour garder en mémoire la position du doigt/souris au début du geste
  const startPos = useRef({ x: 0, y: 0 });

  // 1. Quand l'utilisateur touche un bloc
  const handlePointerDown = (e, bloc) => {
    onSelectBloc(bloc); // Sélectionne le bloc
    startPos.current = { x: e.clientX, y: e.clientY }; // Enregistre le point de départ

    // Capture les mouvements même si le doigt sort légèrement du bloc
    e.target.setPointerCapture(e.pointerId);
  };

  // 2. Pendant le glissement du doigt / de la souris
  const handlePointerMove = (e, bloc) => {
    // Si le bloc sur lequel on glisse n'est pas le bloc sélectionné, on ne fait rien
    if (!blocSelectionne || blocSelectionne.id !== bloc.id) return;

    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;

    // Seuil de déclenchement du mouvement (en pixels)
    const SEUIL = 25;

    // Déplacement Horizontal
    if (bloc.orientation === "horizontal") {
      if (deltaX > SEUIL) {
        onMove("right");
        startPos.current.x = e.clientX; // Réinitialise l'axe pour pouvoir enchaîner
      } else if (deltaX < -SEUIL) {
        onMove("left");
        startPos.current.x = e.clientX;
      }
    }
    // Déplacement Vertical
    else if (bloc.orientation === "vertical") {
      if (deltaY > SEUIL) {
        onMove("down");
        startPos.current.y = e.clientY;
      } else if (deltaY < -SEUIL) {
        onMove("up");
        startPos.current.y = e.clientY;
      }
    }
  };

  // 3. Quand l'utilisateur relève le doigt
  const handlePointerUp = (e) => {
    if (e.target.hasPointerCapture(e.pointerId)) {
      e.target.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div style={styles.grille}>
      {blocs.map((bloc) => {
        const estSelectionne = blocSelectionne?.id === bloc.id;
        return (
          <div
            key={bloc.id}
            onPointerDown={(e) => handlePointerDown(e, bloc)}
            onPointerMove={(e) => handlePointerMove(e, bloc)}
            onPointerUp={handlePointerUp}
            style={{
              ...styles.bloc,
              left: `${bloc.x * 50}px`,
              top: `${bloc.y * 50}px`,
              width: `${bloc.orientation === "horizontal" ? bloc.longueur * 50 : 50}px`,
              height: `${bloc.orientation === "vertical" ? bloc.longueur * 50 : 50}px`,
              backgroundColor: bloc.estCible ? "#ef4444" : "#64748b",
              border: estSelectionne
                ? "3px solid #f59e0b"
                : "2px solid #1e293b",
              boxShadow: estSelectionne ? "0 0 12px #f59e0b" : "none",
            }}
          />
        );
      })}
    </div>
  );
}

const styles = {
  grille: {
    position: "relative",
    width: "300px",
    height: "300px",
    backgroundColor: "#1e293b",
    border: "4px solid #334155",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
    // Empêche le défilement de la page sur mobile quand on touche la grille
    touchAction: "none",
  },
  bloc: {
    position: "absolute",
    borderRadius: "8px",
    cursor: "grab",
    transition: "left 0.1s ease, top 0.1s ease",
    boxSizing: "border-box",
    userSelect: "none", // Empêche la sélection de texte
    touchAction: "none", // Indispensable pour la fluidité tactile
  },
};

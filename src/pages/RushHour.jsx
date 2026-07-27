import { useState, useEffect } from "react";
// Importation des données de niveaux et constantes
import { NIVEAUX, GRID_SIZE, LOCAL_STORAGE_KEY } from "../data/rushHourLevels";
// Importation des sous-composants découpés
import RushHourHeader from "../components/rushHour/RushHourHeader";
import RushHourBoard from "../components/rushHour/RushHourBoard";
import RushHourControls from "../components/rushHour/RushHourControls";

export default function RushHour() {
  // ===================================================================
  // 1. ÉTATS REACT (STATE) ET SAUVEGARDE LOCALSTORAGE
  // ===================================================================

  // Index du niveau actuel (charge la sauvegarde du navigateur si elle existe)
  const [indexNiveau, setIndexNiveau] = useState(() => {
    const sauvede = localStorage.getItem(LOCAL_STORAGE_KEY);
    return sauvede ? (JSON.parse(sauvede).indexNiveau ?? 0) : 0;
  });

  // Liste modifiable des blocs du niveau en cours
  const [blocs, setBlocs] = useState(() => NIVEAUX[indexNiveau].blocs);

  // Compteur du nombre de coups effectués par le joueur
  const [compteurMouvements, setCompteurMouvements] = useState(0);

  // Stocke le bloc actuellement sélectionné par l'utilisateur (ou null)
  const [blocSelectionne, setBlocSelectionne] = useState(null);

  // Indique si le niveau est gagné
  const [estGagne, setEstGagne] = useState(false);

  // Contient le texte explicatif quand le joueur demande un indice
  const [messageIndice, setMessageIndice] = useState("");

  // Effet pour sauvegarder automatiquement l'avancement dans le LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ indexNiveau }));
  }, [indexNiveau]);

  // ===================================================================
  // 2. FONCTIONS DE REINITIALISATION ET DE PROGRESSION
  // ===================================================================

  // Remet la grille du niveau actuel dans son état d'origine
  const rechargerNiveau = () => {
    setBlocs(NIVEAUX[indexNiveau].blocs);
    setCompteurMouvements(0);
    setBlocSelectionne(null);
    setEstGagne(false);
    setMessageIndice("");
  };

  // Efface la sauvegarde et renvoie le joueur au tout premier niveau
  const reinitialiserProgression = () => {
    setIndexNiveau(0);
    setBlocs(NIVEAUX[0].blocs);
    setCompteurMouvements(0);
    setBlocSelectionne(null);
    setEstGagne(false);
    setMessageIndice("");
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  // Effet pour réinitialiser le plateau si le niveau change
  const passerNiveauSuivant = () => {
    if (indexNiveau + 1 < NIVEAUX.length) {
      const suivant = indexNiveau + 1;
      setIndexNiveau(suivant);
      setBlocs(NIVEAUX[suivant].blocs);
      setCompteurMouvements(0);
      setBlocSelectionne(null);
      setEstGagne(false);
      setMessageIndice("");
    }
  };

  // ===================================================================
  // 3. LOGIQUE MATHEMATIQUE : CALCULS DE COLLISION & DEPLACEMENT
  // ===================================================================

  // Calcule et retourne un tableau de coordonnées [{x, y}, ...] occupées par un bloc
  const casesOccupees = (b) => {
    const cases = [];
    for (let i = 0; i < b.longueur; i++) {
      cases.push(
        b.orientation === "horizontal"
          ? { x: b.x + i, y: b.y }
          : { x: b.x, y: b.y + i },
      );
    }
    return cases;
  };

  // Vérifie si la nouvelle position du bloc sort du plateau ou chevauche un autre bloc
  const detecterCollision = (bloc, nouvelleX, nouvelleY, tousLesBlocs) => {
    // 1. Vérification des bords de la grille (0 à 5)
    if (
      nouvelleX < 0 ||
      nouvelleY < 0 ||
      nouvelleX >= GRID_SIZE ||
      nouvelleY >= GRID_SIZE
    )
      return true;
    if (
      bloc.orientation === "horizontal" &&
      nouvelleX + bloc.longueur > GRID_SIZE
    )
      return true;
    if (
      bloc.orientation === "vertical" &&
      nouvelleY + bloc.longueur > GRID_SIZE
    )
      return true;

    // 2. Vérification du chevauchement avec un autre bloc
    const casesProposees = casesOccupees({
      ...bloc,
      x: nouvelleX,
      y: nouvelleY,
    });

    for (const autreBloc of tousLesBlocs) {
      if (autreBloc.id !== bloc.id) {
        const casesAutre = casesOccupees(autreBloc);
        for (const cP of casesProposees) {
          for (const cA of casesAutre) {
            if (cP.x === cA.x && cP.y === cA.y) return true; // Collision trouvée
          }
        }
      }
    }
    return false; // Mouvement valide !
  };

  // Applique le déplacement si aucune collision n'est détectée
  const deplacerBloc = (bloc, nouvelleX, nouvelleY) => {
    if (!detecterCollision(bloc, nouvelleX, nouvelleY, blocs)) {
      // Met à jour la liste des blocs dans le state
      const nouveauxBlocs = blocs.map((b) =>
        b.id === bloc.id ? { ...b, x: nouvelleX, y: nouvelleY } : b,
      );
      setBlocs(nouveauxBlocs);
      setCompteurMouvements((prev) => prev + 1);

      // Met à jour le bloc actuellement sélectionné avec sa nouvelle position
      const blocMisAJour = { ...bloc, x: nouvelleX, y: nouvelleY };
      setBlocSelectionne(blocMisAJour);

      // Vérifie si le bloc rouge a atteint le bord droit de la grille (Victoire)
      if (
        blocMisAJour.estCible &&
        nouvelleX + blocMisAJour.longueur === GRID_SIZE
      ) {
        setEstGagne(true);
      }
    }
  };

  // Gestion des appuis sur les flèches du D-Pad
  const handleMove = (direction) => {
    if (!blocSelectionne || estGagne) return;

    let nouvelleX = blocSelectionne.x;
    let nouvelleY = blocSelectionne.y;

    // Bloque les mouvements non conformes à l'orientation du bloc
    if (
      (blocSelectionne.orientation === "horizontal" &&
        (direction === "up" || direction === "down")) ||
      (blocSelectionne.orientation === "vertical" &&
        (direction === "left" || direction === "right"))
    ) {
      return;
    }

    // Calcul de la nouvelle coordonnée théorique
    if (direction === "up") nouvelleY -= 1;
    if (direction === "down") nouvelleY += 1;
    if (direction === "left") nouvelleX -= 1;
    if (direction === "right") nouvelleX += 1;

    deplacerBloc(blocSelectionne, nouvelleX, nouvelleY);
  };

  // ===================================================================
  // 4. SYSTEME D'INDICE
  // ===================================================================

  const donnerIndice = () => {
    const rouge = blocs.find((b) => b.estCible);
    const caseBloquanteX = rouge.x + rouge.longueur;

    // Si la voie est totalement libre devant le bloc rouge
    if (caseBloquanteX >= GRID_SIZE) {
      setMessageIndice("💡 Déplace le bloc rouge vers la droite pour sortir !");
      return;
    }

    // Recherche du premier bloc faisant obstacle au bloc rouge
    const blocObstacle = blocs.find((b) => {
      const cases = casesOccupees(b);
      return cases.some((c) => c.x === caseBloquanteX && c.y === rouge.y);
    });

    if (blocObstacle) {
      // Sélectionne automatiquement le bloc gênant pour aider le joueur
      setBlocSelectionne(blocObstacle);
      setMessageIndice(
        `💡 Libère la voie ! Déplace le bloc sélectionné (${
          blocObstacle.orientation === "vertical" ? "Haut/Bas" : "Gauche/Droite"
        }).`,
      );
    } else {
      setMessageIndice("💡 Avance le bloc rouge vers la droite !");
    }
  };

  // ===================================================================
  // 5. RENDU DU COMPOSANT (JSX)
  // ===================================================================

  return (
    <div style={styles.container}>
      {/* En-tête : Titre, boutons d'accueil, réinitialisation et compteur */}
      <RushHourHeader
        niveau={indexNiveau + 1}
        totalNiveaux={NIVEAUX.length}
        coups={compteurMouvements}
        onReset={reinitialiserProgression}
      />

      {/* Bannière de victoire conditionnelle */}
      {estGagne && (
        <div style={styles.victoireBox}>
          <h3>🎉 Niveau Réussi !</h3>
          {indexNiveau + 1 < NIVEAUX.length ? (
            <button style={styles.btnPrimary} onClick={passerNiveauSuivant}>
              Niveau Suivant 🚀
            </button>
          ) : (
            <p>🏆 Félicitations ! Tu as terminé les 15 niveaux !</p>
          )}
        </div>
      )}

      {/* Plateau de jeu 6x6 avec tous les blocs */}
      <RushHourBoard
        blocs={blocs}
        blocSelectionne={blocSelectionne}
        onSelectBloc={setBlocSelectionne}
        onMove={handleMove}
      />

      {/* Panneau de contrôle : D-Pad, Indice et Bouton Recommencer */}
      <RushHourControls
        onMove={handleMove}
        onHint={donnerIndice}
        onRestart={rechargerNiveau}
        messageIndice={messageIndice}
      />
    </div>
  );
}

// ===================================================================
// 6. STYLES DU CONTENEUR PRINCIPAL
// ===================================================================
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    color: "#f8fafc",
    padding: "20px",
  },
  victoireBox: {
    backgroundColor: "#10b98122",
    border: "1px solid #10b981",
    padding: "15px",
    borderRadius: "12px",
    textAlign: "center",
    marginBottom: "15px",
  },
  btnPrimary: {
    padding: "10px 20px",
    backgroundColor: "#10b981",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "5px",
  },
};

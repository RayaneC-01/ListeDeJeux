import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 🛠️ Importation de la fonction sonore pour le minuteur
import { jouerSonTicTac } from "../components/TicTac";

// ===================================================================
// 1. DONNÉES ET FONCTIONS UTILITAIRES DE BASE
// ===================================================================

// Liste des phrases et du temps limite par niveau
const NIVEAUX = [
  { id: 1, phrase: "Le chat mange la souris", tempsMax: 30 },
  {
    id: 2,
    phrase: "Le grand chien aboie très fort dans le jardin",
    tempsMax: 25,
  },
  { id: 3, phrase: "Les enfants jouent au ballon sur la plage", tempsMax: 20 },
  {
    id: 4,
    phrase: "La pluie tombe doucement sur le toit de la maison",
    tempsMax: 15,
  },
  {
    id: 5,
    phrase: "Le soleil brille dans le ciel bleu et clair",
    tempsMax: 10,
  },
  {
    id: 6,
    phrase: "Le vent souffle fort et fait bouger les arbres",
    tempsMax: 10,
  },
];

const melangerMots = (phrase) => {
  // .split(" ") transforme la chaîne en tableau : "a b" -> ["a", "b"]
  // [...array] crée une copie pour ne pas modifier l'original
  // .sort() avec Math.random() - 0.5 réordonne de façon aléatoire
  return [...phrase.split(" ")].sort(() => Math.random() - 0.5);
};

// ===================================================================
// 2. COMPOSANT PRINCIPAL REACT
// ===================================================================

export default function ChronoPhrases() {
  // Hook de React Router pour rediriger l'utilisateur vers une autre page (ex: l'accueil)
  const navigate = useNavigate();

  // -----------------------------------------------------------------
  // ÉTATS REACT (STATE) : Mémoire du composant
  // -----------------------------------------------------------------

  // Index du niveau en cours (0 = Premier niveau, 1 = Deuxième niveau, etc.)
  const [indexNiveau, setIndexNiveau] = useState(0);

  // Mots qu'il reste à choisir dans le bac du bas (mélangés au départ)
  const [motsDisponibles, setMotsDisponibles] = useState(() =>
    melangerMots(NIVEAUX[0].phrase),
  );

  // Mots actuellement placés dans la zone de réponse du joueur
  const [motsSelectionnes, setMotsSelectionnes] = useState([]);

  // Compte à rebours en secondes (démarre avec la valeur tempsMax du premier niveau)
  const [tempsRestant, setTempsRestant] = useState(NIVEAUX[0].tempsMax);

  // Score accumulé par le joueur
  const [score, setScore] = useState(0);

  // Message d'information/feedback ("Bravo", "Erreur", etc.)
  const [message, setMessage] = useState("");

  // Drapeaux (booléens) pour gérer l'affichage des écrans de fin
  const [estGagne, setEstGagne] = useState(false); // Vrai si tous les niveaux sont réussis
  const [estPerdu, setEstPerdu] = useState(false); // Vrai si le temps tombe à zéro


  // Récupère les données de la phrase actuelle dans le tableau NIVEAUX
  const niveauActuel = NIVEAUX[indexNiveau];


  // -----------------------------------------------------------------
  // FONCTION DE RECHARGEMENT D'UN NIVEAU
  // -----------------------------------------------------------------

  /**
   * Re-initialise tous les états nécessaires pour démarrer un niveau donné.
   * @param {number} index - L'index du niveau à charger (0, 1, 2...)
   */
  const chargerNiveau = (index) => {
    const niveau = NIVEAUX[index];
    if (niveau) {
      setMotsDisponibles(melangerMots(niveau.phrase)); // Génère un nouveau mélange
      setMotsSelectionnes([]); // Vide la réponse précédente
      setTempsRestant(niveau.tempsMax); // Remet le chrono à zéro
      setMessage(""); // Efface le message de feedback
    }
  };

  // -----------------------------------------------------------------
  // EFFET DE BORD (useEffect) : GESTION DU MINUTEUR & AUDIO
  // -----------------------------------------------------------------

  useEffect(() => {
    // CONDITION DE GARDE : Si la partie est gagnée, perdue ou le temps expiré, on ne fait rien
    if (estGagne || estPerdu || tempsRestant <= 0) return;

    // Crée une minuterie qui s'exécute toutes les 1000 millisecondes (1 seconde)
    const interval = setInterval(() => {
      setTempsRestant((prev) => {
        // Si le temps atteint 1 seconde ou moins, c'est le Game Over
        if (prev <= 1) {
          clearInterval(interval); // Stoppe la minuterie
          setEstPerdu(true); // Active l'écran de défaite
          return 0;
        }

        // Calcule le temps qu'il restera à la prochaine seconde
        const nouveauTemps = prev - 1;

        // 🔔 DECLENCHEMENT DU SON : Si moins de 10 secondes, on joue le bip sonore
        if (nouveauTemps <= 10 && nouveauTemps > 0) {
          jouerSonTicTac();
        }

        return nouveauTemps; // Met à jour l'état du temps
      });
    }, 1000);

    // NETTOYAGE : Si le composant est fermé/démonté, on stoppe l'intervalle pour éviter les fuites de mémoire
    return () => clearInterval(interval);
  }, [tempsRestant, estGagne, estPerdu]);

  // -----------------------------------------------------------------
  // GESTION DES CLICS SUR LES MOTS
  // -----------------------------------------------------------------

  /**
   * Action au clic sur un mot dans la banque de mots disponibles.
   * Déplace le mot du bas vers le haut.
   */
  const ajouterMot = (mot, index) => {
    // Crée une copie du tableau des mots disponibles pour pouvoir le modifier
    const nouveauxDisponibles = [...motsDisponibles];
    nouveauxDisponibles.splice(index, 1); // Supprime le mot cliqué de la liste

    setMotsDisponibles(nouveauxDisponibles);
    setMotsSelectionnes([...motsSelectionnes, mot]); // Ajoute le mot à la phrase sélectionnée
  };

  /**
   * Action au clic sur un mot déjà placé dans la phrase du joueur.
   * Déplace le mot du haut vers le bas (remise en réserve).
   */
  const retirerMot = (mot, index) => {
    const nouveauxSelectionnes = [...motsSelectionnes];
    nouveauxSelectionnes.splice(index, 1); // Retire le mot de la réponse

    setMotsSelectionnes(nouveauxSelectionnes);
    setMotsDisponibles([...motsDisponibles, mot]); // Remet le mot dans les choix
  };

  // -----------------------------------------------------------------
  // SYNTHÈSE VOCALE (Web Speech API)
  // -----------------------------------------------------------------

  /**
   * Utilise le moteur vocal natif du navigateur pour lire une phrase.
   */
  const lirePhrase = (texte) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(texte);
      utterance.lang = "fr-FR"; // Configure la voix en Français
      window.speechSynthesis.speak(utterance); // Déclenche la parole
    }
  };

  // -----------------------------------------------------------------
  // VERIFICATION DU RÉSULTAT
  // -----------------------------------------------------------------

  /**
   * Vérifie si l'assemblage de mots du joueur correspond à la phrase originale.
   */
  const verifierPhrase = () => {
    // Transforme le tableau de mots choisis en une seule chaîne de texte séparée par des espaces
    const phraseJoueur = motsSelectionnes.join(" ").trim();
    const phraseAttendue = niveauActuel.phrase.trim();

    // Comparaison insensible à la casse (minuscules / majuscules)
    if (phraseJoueur.toLowerCase() === phraseAttendue.toLowerCase()) {
      // SUCCESS : Calcul du score (base de 10 points + bonus de vitesse selon le temps restant)
      setScore((prev) => prev + 10 + tempsRestant);
      setMessage("Bravo ! Phrase correcte 🎉");
      lirePhrase(phraseAttendue); // Fait lire la phrase au navigateur

      // Attend 1.5 seconde pour laisser le temps d'entendre la voix avant de passer la suite
      setTimeout(() => {
        if (indexNiveau + 1 < NIVEAUX.length) {
          const suivant = indexNiveau + 1;
          setIndexNiveau(suivant);
          chargerNiveau(suivant); // Charge le niveau suivant
        } else {
          setEstGagne(true); // C'était le dernier niveau, partie gagnée !
        }
      }, 1500);
    } else {
      // ECHEC : Pénalité de 3 secondes sur le chrono
      setTempsRestant((prev) => Math.max(0, prev - 3));
      setMessage("Oups ! L'ordre des mots n'est pas bon ❌ (-3s)");
    }
  };

  /**
   * Recommence le jeu depuis le tout premier niveau (Bouton Rejouer / Réessayer).
   */
  const recommencer = () => {
    setIndexNiveau(0);
    setScore(0);
    setEstGagne(false);
    setEstPerdu(false);
    chargerNiveau(0);
  };

  // ===================================================================
  // 3. AFFICHAGE DU COMPOSANT (JSX)
  // ===================================================================

  return (
    <div style={styles.container}>
      {/* Bouton de retour au menu principal */}
      <button style={styles.backBtn} onClick={() => navigate("/")}>
        ← Retour Accueil
      </button>

      <h1 style={styles.title}>⏱️ Chrono Phrases</h1>

    

      {/* CAS 1 : ÉCRAN DE VICTOIRE FINALE */}
      {estGagne ? (
        <div style={styles.card}>
          <h2>🎉 FÉLICITATIONS ! 🎉</h2>
          <p>Tu as réussi tous les niveaux !</p>
          <p>
            Score Final : <strong>{score} points</strong>
          </p>
          <button style={styles.btn} onClick={recommencer}>
            Rejouer
          </button>
        </div>
      ) : estPerdu ? (
        /* CAS 2 : ÉCRAN DE DÉFAITE (Game Over) */
        <div style={styles.card}>
          <h2>⌛ Temps Écoulé !</h2>
          <p>Tu as manqué de temps.</p>
          <button style={styles.btn} onClick={recommencer}>
            Réessayer
          </button>
        </div>
      ) : (
        /* CAS 3 : ÉCRAN DE JEU EN COURS */
        <div style={styles.card}>
          {/* Entête d'infos : Niveau, Chrono et Score */}
          <div style={styles.header}>
            <span>
              Niveau : {indexNiveau + 1} / {NIVEAUX.length}
            </span>
            <span
              style={{
                // Change de couleur quand il reste 5s ou moins (Rouge vs Vert)
                color: tempsRestant <= 5 ? "#ef4444" : "#10b981",
                fontWeight: "bold",
              }}
            >
              ⏱️ {tempsRestant}s
            </span>
            <span>Score : {score}</span>
          </div>

          <p style={styles.instruction}>Remets les mots dans le bon ordre :</p>

          {/* Zone de construction (où les mots sélectionnés apparaissent) */}
          <div style={styles.dropZone}>
            {motsSelectionnes.length === 0 && (
              <span style={styles.placeholder}>
                Clique sur les mots en bas...
              </span>
            )}
            {motsSelectionnes.map((mot, index) => (
              <button
                key={index}
                style={styles.motBtnSelected}
                onClick={() => retirerMot(mot, index)}
              >
                {mot}
              </button>
            ))}
          </div>

          {/* Bac de réserve (les mots restants à placer) */}
          <div style={styles.wordsBank}>
            {motsDisponibles.map((mot, index) => (
              <button
                key={index}
                style={styles.motBtn}
                onClick={() => ajouterMot(mot, index)}
              >
                {mot}
              </button>
            ))}
          </div>

          {/* Affichage des messages de victoire ou d'erreur */}
          {message && <p style={styles.feedback}>{message}</p>}

          {/* Bouton de validation (Désactivé tant qu'il reste des mots non placés) */}
          <button
            style={styles.validateBtn}
            onClick={verifierPhrase}
            disabled={motsDisponibles.length > 0}
          >
            Valider la phrase
          </button>
        </div>
      )}
    </div>
  );
}

// 4. FEUILLE DE STYLES EN OBJET JAVASCRIPT (CSS-in-JS)
const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    color: "#f8fafc",
    minHeight: "100vh",
    backgroundColor: "#0f172a",
  },
  backBtn: {
    padding: "8px 16px",
    backgroundColor: "#334155",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  title: { fontSize: "2rem", marginBottom: "20px" },
  card: {
    maxWidth: "500px",
    margin: "0 auto",
    backgroundColor: "#1e293b",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    fontSize: "1.1rem",
  },
  instruction: { marginBottom: "15px", color: "#94a3b8" },
  dropZone: {
    minHeight: "60px",
    padding: "10px",
    border: "2px dashed #475569",
    borderRadius: "10px",
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    backgroundColor: "#0f172a",
  },
  placeholder: { color: "#64748b", fontSize: "0.9rem" },
  wordsBank: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  motBtn: {
    padding: "10px 16px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  motBtnSelected: {
    padding: "10px 16px",
    backgroundColor: "#10b981",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  validateBtn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#6366f1",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
  btn: {
    padding: "10px 20px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "15px",
  },
  feedback: { marginBottom: "15px", fontWeight: "bold", color: "#f59e0b" },
};

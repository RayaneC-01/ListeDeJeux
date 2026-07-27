import { useNavigate } from "react-router-dom";

// ===================================================================
// 1. COMPOSANT HEADER POUR RUSH HOUR
// ===================================================================
export default function RushHourHeader({ niveau, totalNiveaux, coups, onReset }) {
  const navigate = useNavigate();

  return (
    <div style={styles.header}>
      <div style={styles.topBar}>
        <button style={styles.btnSecondary} onClick={() => navigate("/")}>
          ← Accueil
        </button>
        <button style={styles.btnReset} onClick={onReset}>
          Reset Progression
        </button>
      </div>

      <h1 style={styles.title}>🔴 Rush Hour</h1>
      <p style={styles.subtitle}>Libère le carré rouge jusqu'à la sortie !</p>

      <div style={styles.infoCard}>
        <span>Niveau : <strong>{niveau} / {totalNiveaux}</strong></span>
        <span>Coups : <strong>{coups}</strong></span>
      </div>
    </div>
  );
}

const styles = {
  header: { display: "flex", flexDirection: "column", alignItems: "center", width: "100%" },
  topBar: { width: "100%", maxWidth: "400px", display: "flex", justifyContent: "space-between", marginBottom: "15px" },
  title: { fontSize: "2rem", margin: "5px 0" },
  subtitle: { color: "#94a3b8", marginBottom: "15px", fontSize: "0.9rem" },
  infoCard: { display: "flex", gap: "30px", backgroundColor: "#1e293b", padding: "10px 20px", borderRadius: "10px", marginBottom: "15px" },
  btnSecondary: { padding: "8px 14px", backgroundColor: "#334155", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" },
  btnReset: { padding: "8px 14px", backgroundColor: "#ef444422", color: "#ef4444", border: "1px solid #ef4444", borderRadius: "8px", cursor: "pointer" },
};
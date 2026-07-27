
export default function RushHourControls({
  onMove,
  onHint,
  onRestart,
  messageIndice,
}) {
  return (
    <div style={styles.container}>
      <div style={styles.dpad}>
        <button style={styles.btnArrow} onClick={() => onMove("up")}>
          ▲
        </button>
        <div style={styles.dpadRow}>
          <button style={styles.btnArrow} onClick={() => onMove("left")}>
            ◄
          </button>
          <button style={styles.btnArrow} onClick={() => onMove("right")}>
            ►
          </button>
        </div>
        <button style={styles.btnArrow} onClick={() => onMove("down")}>
          ▼
        </button>
      </div>

      <button style={styles.btnHint} onClick={onHint}>
        💡 Indice
      </button>

      {messageIndice && <p style={styles.hintText}>{messageIndice}</p>}

      <button style={styles.btnAction} onClick={onRestart}>
        🔄 Recommencer
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "15px",
    gap: "10px",
  },
  dpad: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
  },
  dpadRow: { display: "flex", gap: "35px" },
  btnArrow: {
    width: "45px",
    height: "45px",
    backgroundColor: "#334155",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "1.2rem",
    cursor: "pointer",
  },
  btnHint: {
    padding: "8px 16px",
    backgroundColor: "#f59e0b22",
    color: "#f59e0b",
    border: "1px solid #f59e0b",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  hintText: {
    color: "#f59e0b",
    fontSize: "0.85rem",
    fontStyle: "italic",
    maxWidth: "280px",
    textAlign: "center",
  },
  btnAction: {
    padding: "10px 20px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const goToGame2048 = () => {
    navigate("/2048");
  };

  const goToTicTacToe = () => {
    navigate("/tic-tac-toe");
  };

  const goToMemoryGame = () => {
    navigate("/memory-game");
  };

  const games = [
    {
      nom: "2048",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReMzylExBcrVBd2SbSb_k6pd9RNK0MK6Ib3yuUjyrfqw&s=10",
    },

    //Jeu Tic Tac Toe (Morpion)
    {
      nom: "Tic Tac Toe",
      img: "https://media.istockphoto.com/id/1199026285/fr/photo/jeu-de-tic-tac-toe.webp?a=1&b=1&s=612x612&w=0&k=20&c=h-DYFrxRXHHbzRKJM04umI9gVFKfazAwh7K43zY9fOw=",
    },

    // Jeu Mémoire de Cartes
    {
      nom: "Mémoire de Cartes",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpJtIsv4PMb68gVExy76J62a7xyGX9-yG9Gk384gJgyQ&s=10",
    },
  ];

  return (
    <div style={styles.homeContainer}>
      <h1 style={styles.mainTitle}>Bienvenue sur l'Arcade</h1>
      <div style={styles.gamesList}>
        {games.map((game, index) => (
          <div
            key={index}
            style={styles.gameCard}
            onClick={
              game.nom === "2048"
                ? goToGame2048
                : game.nom === "Tic Tac Toe"
                  ? goToTicTacToe
                  : goToMemoryGame
            }
          >
            {/* 1. L'image en premier */}
            <div style={styles.imgContainer}>
              <img src={game.img} alt={game.nom} style={styles.img} />
            </div>
            {/* 2. Le nom du jeu en bas */}
            <h2 style={styles.gameTitle}>{game.nom}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  homeContainer: {
    textAlign: "center",
    padding: "40px 20px",
  },
  mainTitle: {
    marginBottom: "30px",
    fontSize: "2rem",
  },
  gamesList: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
  },
  gameCard: {
    width: "220px",
    padding: "15px",
    border: "1px solid #334155",
    borderRadius: "16px",
    backgroundColor: "#0f172a",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  imgContainer: {
    width: "100%",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "12px",
  },
  img: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    display: "block",
  },
  gameTitle: {
    margin: "5px 0 0 0",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#f8fafc",
  },
};

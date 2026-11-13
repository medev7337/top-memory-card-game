import { useEffect, useState } from "react";
import Card from "./Card";
import "../styles/modalStyles.css";

// Easy - 4 cards shown, 12 cards total
// Get first 4 after shuffling

function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function Game({
  playList,
  cardAmount,
  setGameStarted,
  highScore,
  setHighScore,
}) {
  const [score, setScore] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [showingList, setShowingList] = useState([]);
  const [clickedList, setClickedList] = useState([]);
  const [gameState, setGameState] = useState(0);
  const [round, setRound] = useState(0);

  useEffect(() => {
    function updateShowingList() {
      if (playList.length === 0) return;
      if (gameState !== 0) return;
      if (score === playList.length) {
        setGameState(2);
        return;
      }

      const availableCards = playList.filter(
        (card) => !clickedList.includes(card.id),
      );

      const selectedCard =
        availableCards[Math.floor(Math.random() * availableCards.length)];

      const sl = shuffleArray(playList);

      const nl = [
        selectedCard,
        ...sl
          .filter((card) => card.id !== selectedCard.id)
          .slice(0, cardAmount - 1),
      ];

      setShowingList(shuffleArray(nl));
      setHidden(false);
    }

    const timeout = setTimeout(() => {
      updateShowingList();
    }, 500);

    return () => clearTimeout(timeout);
  }, [playList, cardAmount, clickedList, score, gameState]);

  function handleClick(id) {
    if (gameState !== 0) return;
    if (clickedList.includes(id)) {
      // Uncomment or comment this line to add or remove lose state from the game
      // setGameState(1);
      return;
    }
    setHidden(true);
    const newScore = score + 1;
    setScore(newScore);
    setRound(round + 1);
    setClickedList([...clickedList, id]);
  }

  const cardSection = (
    <div className="cardContainer">
      {showingList.map((card) => (
        <Card
          key={`${card.id}-${round}-${hidden}`}
          id={card.id}
          text={card.car}
          img={card.img}
          click={handleClick}
          hidden={hidden}
        />
      ))}
    </div>
  );

  function backToMenu() {
    if (score > highScore) {
      setHighScore(score);
    }
    setGameStarted(false);
  }

  const loseModal = (
    <div className="modalOverlay">
      <div className="modal" id="loseModal">
        <p>Ooops</p>
        <button onClick={backToMenu}>Back to menu</button>
      </div>
    </div>
  );

  const wonModal = (
    <div className="modalOverlay">
      <div className="modal" id="wonModal">
        <p>You Won</p>
        <button onClick={backToMenu}>Back to menu</button>
      </div>
    </div>
  );

  return (
    <div className="gameHolder">
      <p>Current Score: {score}</p>
      {gameState === 2 && wonModal}
      {gameState === 1 && loseModal}
      {cardSection}
    </div>
  );
}

export default Game;

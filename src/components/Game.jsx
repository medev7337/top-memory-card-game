import { useEffect, useState } from "react";
import Card from "./Card";

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

function Game({ playList, cardAmount }) {
  const [score, setScore] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [showingList, setShowingList] = useState([]);
  const [clickedList, setClickedList] = useState([]);
  const [won, setWon] = useState(false);
  const [round, setRound] = useState(0);

  useEffect(() => {
    function updateShowingList() {
      if (playList.length === 0) return;
      if (score === playList.length) {
        setWon(true);
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

      setShowingList(nl);
    }

    const timeout = setTimeout(() => {
      setHidden(false);
      updateShowingList();
    }, 500);

    return () => clearTimeout(timeout);
  }, [playList, cardAmount, clickedList, score]);

  function handleClick(id) {
    if (clickedList.includes(id)) {
      console.log("Ooops");
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

  return (
    <div>
      <p>Current Score: {score}</p>
      {won ? <div>Won</div> : cardSection}
    </div>
  );
}

export default Game;

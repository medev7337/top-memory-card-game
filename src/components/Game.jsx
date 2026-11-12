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

  useEffect(() => {
    function updateShowingList() {
      if (playList.length === 0) return;
      if (score === playList.length) return;

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
      setHidden(false);
    }

    updateShowingList();
  }, [playList, cardAmount, hidden, clickedList, score]);

  function handleClick(id) {
    if (clickedList.includes(id)) {
      console.log("Ooops");
      return;
    }
    setHidden(true);
    setScore(score + 1);
    setClickedList([...clickedList, id]);
  }

  return (
    <div>
      <p>Current Score: {score}</p>
      {hidden || playList.length === 0 ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="cardContainer">
          {showingList.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              text={card.car}
              img={card.img}
              click={() => handleClick(card.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Game;

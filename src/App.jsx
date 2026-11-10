import { useEffect, useState } from "react";
import fetchCards from "./components/API";
import Card from "./components/Card";
import "./styles/cardStyles.css";

function App() {
  const [selectedCards, setSelectedCards] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoading, setIFL] = useState(true);
  const [score, setScore] = useState(0);

  function handleCardClick(id) {
    if (isLoading) return;
    console.log(id);
    // Checks if the card is already in selectedCards
    const cObj = cardList.find((item) => item.id === id);
    if (selectedCards.includes(cObj)) {
      console.log("It was already selected");
      return;
    }
    setScore(score + 1);
    setSelectedCards((prev) => [...prev, cObj]);
  }

  return (
    <div className="mainContainer">
      <h1>The Memory Card Game</h1>
      <p>
        Get points by clicking on an image but don't click on any more than
        once!
      </p>
      <div>
        <p>Current Score: {selectedCards.length}</p>
        <p>High Score: 99</p>
        {isLoading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : (
          <div className="cardContainer">
            {cardList.map((card) => (
              <Card
                key={card.id}
                id={card.id}
                text={card.text}
                img={card.image}
                click={handleCardClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

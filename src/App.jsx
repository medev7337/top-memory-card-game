import { useEffect, useState } from "react";
import fetchCards from "./components/API";
import Game from "./components/Game";
import "./styles/cardStyles.css";

function getRandomItems(array, amount) {
  const result = [];

  while (result.length < amount && result.length < array.length) {
    const randomIndex = Math.floor(Math.random() * array.length);

    if (!result.includes(array[randomIndex])) {
      result.push(array[randomIndex]);
    }
  }

  return result;
}

function App() {
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    let ignore = false;

    function fetchCars() {
      if (ignore) return;

      const cards = fetchCards(42);
      setCardList(cards);
    }

    fetchCars();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="mainContainer">
      <h1>The Memory Card Game</h1>
      <p>
        Get points by clicking on an image but don't click on any more than
        once!
      </p>
      <p>High Score: 99</p>
      <Game playList={getRandomItems(cardList, 12)} cardAmount={4} />
    </div>
  );
}

export default App;

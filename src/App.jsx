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
  const [highScore, setHighScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [cDiff, setCDiff] = useState();

  const difficultySettings = [
    {
      mode: "easy",
      cards: 12,
      cardAmount: 4,
    },
    {
      mode: "normal",
      cards: 24,
      cardAmount: 8,
    },
    {
      mode: "hard",
      cards: 36,
      cardAmount: 12,
    },
  ];

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

  function startGame(diff) {
    setGameStarted(true);
    setCDiff(difficultySettings[diff]);
  }

  return (
    <div className="mainContainer">
      <h1>The Memory Cars</h1>
      {gameStarted ? (
        <Game
          playList={getRandomItems(cardList, cDiff.cards)}
          cardAmount={cDiff.cardAmount}
          setGameStarted={setGameStarted}
          highScore={highScore}
          setHighScore={setHighScore}
        />
      ) : (
        <div className="menu">
          <p>
            Get points by clicking on an image but don't click on any, more than
            once!
          </p>
          <p>Highest Score: {highScore}</p>
          <div className="levelButtons">
            <button onClick={() => startGame(0)}>Easy</button>
            <button onClick={() => startGame(1)}>Normal</button>
            <button onClick={() => startGame(2)}>Hard</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

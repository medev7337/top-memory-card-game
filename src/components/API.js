import carList from "./car-list.js";

function fetchCards(amount) {
  const cl = [];

  for (let i = 0; i < amount; i++) {
    const randomCar = carList[Math.floor(Math.random() * carList.length)];
    const imagePath = `/cars/${randomCar}.png`;
    cl.push(imagePath);
  }

  return cl;
}

export default fetchCards;

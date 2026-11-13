import carList from "./car-list.js";

function fetchCards(amount) {
  const ignoreIndex = [];
  const cl = [];

  for (let i = 0; i < amount; i++) {
    let index;
    do {
      index = Math.floor(Math.random() * carList.length);
    } while (ignoreIndex.includes(index));

    const randomCar = carList[index];

    const o = {
      id: index,
      car: randomCar,
      img: `${import.meta.env.BASE_URL}cars/${randomCar}.png`,
    };

    cl.push(o);
    ignoreIndex.push(index);
  }

  return cl;
}

export default fetchCards;

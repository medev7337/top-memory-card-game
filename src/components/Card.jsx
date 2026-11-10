function Card({ id, text, img, click }) {
  return (
    <div className="card" id={id} onClick={() => click(id)}>
      <div>
        <img src={img} />
      </div>
      <p>{text}</p>
    </div>
  );
}

export default Card;

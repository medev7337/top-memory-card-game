function Card({ id, text, img, click, hidden = false }) {
  const fullCard = (
    <div className={`card ${hidden ? "hidden" : ""}`}>
      <div className="cardFront" id={id} onClick={() => click(id)}>
        <div>
          <img src={img} />
        </div>
        <p>{text}</p>
      </div>

      <div className="cardBack">{/* Back design */}</div>
    </div>
  );

  return fullCard;
}

export default Card;

import { Link } from "react-router-dom";
import "./styles/Card.scss";

const Card = ({ pokemon }) => {
  return (
    <Link to={`/pokemon/${pokemon.name}`}>
      <div className="card">
        <img
          className="card__img"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <div className="card__content">{pokemon.name}</div>
        <div className="card__footer">
          <button>Add to favorite</button>
          {/* <button >Add to compare</button> */}
        </div>
      </div>
    </Link>
  );
};

export default Card;

import { Link } from "react-router-dom";
import "./styles/Card.scss";

const Card = ({ pokemon }) => {
  return (
    <Link to={`/pokemon/${pokemon.name}`} className="card">
      <img
        className="card__img"
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
      <div className="card__content">
        <h4 className="card__id">#{pokemon.id}</h4>
        <h3 className="card__name">{pokemon.name}</h3>
      </div>
      <div className="card__footer">
        {/* <button>Add to favorite</button> */}
      </div>
    </Link>
  );
};

export default Card;

import { useContext } from "react";
import { Link } from "react-router-dom";
import "./styles/Card.scss";
import { Context } from "./ContextProvider";

const Card = ({ pokemon }) => {
  const [favorites, setFavorites] = useContext(Context);

  const handleFavorites = (pokemon) => {
    const favoriteList = [...favorites, pokemon]
    setFavorites([...new Set(favoriteList)]);
  };

  return (
    <div className="card">
      <Link to={`/pokemon/${pokemon.name}`} >
        <img
          className="card__img"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <div className="card__content">
          <h4 className="card__id">#{pokemon.id}</h4>
          <h3 className="card__name">{pokemon.name}</h3>
        </div>
      </Link>
      <div className="card__footer">
        <button onClick={() => handleFavorites(pokemon)}>
          Add to favorite
        </button>
      </div>
    </div>
  );
};

export default Card;

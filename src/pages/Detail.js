import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import "./styles/Detail.scss";

const Detail = () => {
  let { name } = useParams();
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((resp) => resp.json())
      .then((data) => {
        setPokemon(data);
      });
  }, [name]);

  return (
    <>
      <Header />

      {pokemon && (
        <>
          <div className="pokemon">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <div className="pokemon__info">
              <h1 className="info__name">{pokemon.name}</h1>
              <p className="info__id">
                <strong>ID: </strong>
                {pokemon.id}
              </p>

              <div className="info__type">
                <h3>Type:</h3>
                {pokemon.types.map(({ type }) => (
                  <Link to={`/list/${type.name}`} key={type.name}>
                    <button className="pokemon__button">{type.name}</button>
                  </Link>
                ))}
              </div>
              <div className="info__abilities">
                <h3>Abilities:</h3>
                {pokemon.abilities.map(({ ability }) => (
                  <span key={ability.name}>{ability.name}</span>
                ))}
              </div>
              <p>
                <strong>Height: </strong>
                {pokemon.height}
              </p>
              <p>
                <strong>Weight: </strong>
                {pokemon.weight}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;

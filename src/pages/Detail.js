import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  let { name } = useParams();
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    console.log("NAME", name);
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setPokemon(data);
      });
  }, []);

  return (
    <>
      <h2>DETAIL {name}</h2>
      {pokemon && (
        <>
          <div className="pokemon">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <div className="pokemon__info">
              <h2>{pokemon.name}</h2>
              <p>{`ID: #${pokemon.id}`}</p>
              <div>
                <h3>Type:</h3>
                {pokemon.types.map(({type}) => (
                  <span key={type.name}>{type.name}</span>
                ))}
              </div>
              <div>
                <h3>Abilities:</h3>
                {pokemon.abilities.map(({ability}) => (
                  <span key={ability.name}>{ability.name}</span>
                ))}
              </div>
              <p>{`Height: ${pokemon.height}`}</p>
              <p>{`Weight: ${pokemon.weight}`}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;

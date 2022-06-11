import { useState, useEffect } from "react";
import "./styles/Card.scss";


const Card=({ name }) =>{
  const [pokemon, setPokemon] = useState();
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setPokemon(data);
      })
      .catch((error) => console.error(error));
  }, []);


  return (
    <div className="card" >
      <img
       className="card__img"
        src={pokemon?.sprites?.front_default}
        alt={pokemon?.name}
      />
      <div className="card__content">
        
        {pokemon?.name}
       
      </div>
      <div className="card__footer">
        <button >Favorite</button>
        <button >Add to compare</button>
      </div>
    </div>
  );
}

export default Card
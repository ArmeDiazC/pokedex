import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState("");
  const [pokemons, setPokemons] = useState();

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setPokemons(data);
      }).catch((error)=>console.error(error))
  }, []);

  const findPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((resp) => resp.json())
      .then((data) => console.log(data))
  };

  return (
    <div className="App">
      <input
        type="text"
        onChange={({ target }) => setPokemon(target.value)}
        value={pokemon}
      ></input>
      <button onClick={findPokemon}>Buscar</button>
      <div></div>
      <div>
        {pokemons?.results.map((poke) => (
          <div><a href={poke.url} key={poke.name}>{poke.name}</a></div>
        ))}
      </div>
    </div>
  );
}

export default App;

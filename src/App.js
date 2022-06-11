import { useState, useEffect } from "react";
import Card from "./components/Card";
import "./App.scss";

function App() {
  const [pokemon, setPokemon] = useState("");
  const [pokemons, setPokemons] = useState();

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setPokemons(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const findPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((resp) => resp.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="App">
      <input
        type="text"
        onChange={({ target }) => setPokemon(target.value)}
        value={pokemon}
      ></input>
      <button onClick={findPokemon}>Search</button>
      <div className="App__container">
      {pokemons?.results.map((poke) => (
          <Card name={poke.name} />
        ))}
      </div>
     
        
     
    </div>
  );
}

export default App;

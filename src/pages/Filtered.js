import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import "./styles/Filtered.scss";
import LoadingSpinner from "../components/LoadingSpinner";

const Filtered = () => {
  let { filter } = useParams();
  const [pokemonData, setPokemonData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://pokeapi.co/api/v2/type/${filter}`)
      .then((resp) => resp.json())
      .then((data) => {
        getPokemonList(data.pokemon);
      });
  }, []);

  const getPokemonList = async (list) => {
    let pokemons = [];
    for (let pokemon of list) {
      pokemons.push(await getPokemonDetail(pokemon));
    }
    setPokemonData(pokemons);
    setIsLoading(false);
  };

  const getPokemonDetail = async ({ pokemon }) => {
    const detail = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
    ).then((resp) => resp.json());
    return detail;
  };

  return (
    <div className="Filtered">
      <Header />
      <h1>Pokemons type {filter}</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="list">
            {pokemonData.map((pokemon) => (
              <Card pokemon={pokemon} key={pokemon.name} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Filtered;

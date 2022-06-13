import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "../components/Card";

const List = () => {
  let { filter } = useParams();
  const [pokemonData, setPokemonData] = useState();

  useEffect(() => {
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
  };

  const getPokemonDetail = async ({ pokemon }) => {
    const detail = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
    ).then((resp) => resp.json());
    return detail;
  };

  return (
    <>
      <Link to={`/`}>Home</Link>
      <SearchBar />
      <h3>{filter}</h3>
      {pokemonData &&
        pokemonData.map((pokemon) => (
          <Card pokemon={pokemon} key={pokemon.name} />
        ))}
    </>
  );
};

export default List;

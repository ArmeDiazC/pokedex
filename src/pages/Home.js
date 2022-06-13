import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import "./styles/Home.scss";

const Home = () => {
  const [pokemonData, setPokemonData] = useState();
  const [urls, setUrls] = useState();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=50`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        let { next, previous } = data;
        setUrls({ next, previous });
        getPokemonList(data.results);
      });
  }, []);

  const getPokemonList = async (list) => {
    let pokemons = [];
    console.log(list);
    for (let pokemon of list) {
      pokemons.push(await getPokemonDetail(pokemon));
    }
    setPokemonData(pokemons);
  };

  const getPokemonDetail = async ({ name }) => {
    const detail = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    ).then((resp) => resp.json());
    return detail;
  };

  const handleFilter = () => {
    const pokemons = pokemonData.filter((pokemon) => {
      for (let type of pokemon.types) {
        return type.type.name == "fire";
      }
    });

    setPokemonData(pokemons);
  };
  const handleRequest = (view) => {
    console.log(urls);

    fetch(urls[view])
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        let { next, previous } = data;
        setUrls({ next, previous });
        getPokemonList(data.results);
      });
  };

  return (
    <>
      <div className="Home">
        <SearchBar />
        {pokemonData && (
          <div className="list">
          <button onClick={handleFilter}>Filter</button>
            <div className="list__items">
              {pokemonData.map((pokemon) => (
                <Card pokemon={pokemon} key={pokemon.name} />
              ))}
            </div>
            <div className="list__links">
              <button
                onClick={() => handleRequest("previous")}
                disabled={urls?.previous === null}
              >
                Prev
              </button>
              <button
                onClick={() => handleRequest("next")}
                disabled={urls?.next === null}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;

import Header from "../components/Header";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import "./styles/Home.scss";

const Home = () => {
  const [pokemonData, setPokemonData] = useState();
  const [urls, setUrls] = useState();
  const [filterOptions, setFilterOptions] = useState();
  const [optionValue, setOptionValue] = useState();
  const [pokemonFiltered, setPokemonFiltered] = useState([]);

  useEffect(() => {
    handleRequest();
  }, []);

  useEffect(() => {
    if (filterOptions) {
      setOptionValue(filterOptions[0]);
    }
  }, [filterOptions]);

  const handleRequest = (
    url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=50"
  ) => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        let { next, previous } = data;
        setUrls({ next, previous });
        getPokemonList(data.results);
      });
  };

  const getPokemonList = async (list) => {
    let pokemons = [];
    for (let pokemon of list) {
      pokemons.push(await getPokemonDetail(pokemon));
    }

    setPokemonData(pokemons);

    setOptions(pokemons);
  };

  const getPokemonDetail = async ({ name }) => {
    const detail = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    ).then((resp) => resp.json());
    return detail;
  };

  const setOptions = (pokemons) => {
    let options = [];
    for (let pokemon of pokemons) {
      const { types } = pokemon;
      for (let type of types) {
        options.push(type.type.name);
      }
    }
    options = [...new Set(options)];
    setFilterOptions(options);
  };

  const handleFilter = (clear = false) => {
    if (clear) {
      return setPokemonFiltered([]);
    }
    const pokemons = pokemonData.filter(({ types }) => {
      return types.some(({ type }) => {
        return type.name == optionValue;
      });
    });
    return setPokemonFiltered(pokemons);
  };

  return (
    <>
      <div className="Home">
        <Header />
        {pokemonData && (
          <div className="list">
            <div>
              <label>
                Filter by Type
                <select
                  value={optionValue}
                  onChange={(event) => setOptionValue(event.target.value)}
                >
                  {filterOptions.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <button onClick={() => handleFilter()} className="list__filter">
                Filter
              </button>
              <button
                onClick={() => handleFilter(true)}
                className="list__filter list__filter-clear"
              >
                clear
              </button>
              <p>We eat {optionValue}!</p>
            </div>
            <div className="list__items">
              {pokemonFiltered.length != 0
                ? pokemonFiltered.map((pokemon) => (
                    <Card pokemon={pokemon} key={pokemon.name} />
                  ))
                : pokemonData.map((pokemon) => (
                    <Card pokemon={pokemon} key={pokemon.name} />
                  ))}
            </div>
            <div className="list__links">
              <button
                onClick={() => handleRequest(urls.previous)}
                disabled={urls?.previous === null}
              >
                Prev
              </button>
              <button
                onClick={() => handleRequest(urls.next)}
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

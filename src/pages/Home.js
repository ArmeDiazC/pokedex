import Header from "../components/Header";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import "./styles/Home.scss";

const Home = () => {
  const [pokemonData, setPokemonData] = useState();
  const [urls, setUrls] = useState();
  const [filterOptions, setFilterOptions] = useState();
  const [optionValue, setOptionValue] = useState();
  const [pokemonFiltered, setPokemonFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(true);
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
    setIsLoading(false);
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
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="list">
              <div className="list__filter">
                <label>
                  Filter view by Type  
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
                <button onClick={() => handleFilter()} className="list__button">
                  Filter
                </button>
                <button
                  onClick={() => handleFilter(true)}
                  className="list__button list__button-clear"
                >
                  clear
                </button>
                {pokemonFiltered.length != 0 ? (
                  <h2>Pokemons type {optionValue}</h2>
                ) : null}
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
              <div className="list__pagination">
                <button
                  onClick={() => handleRequest(urls.previous)}
                  disabled={urls?.previous === null}
                  className=" list__button list__button-pagination"
                >
                  Prev
                </button>
                <button
                  onClick={() => handleRequest(urls.next)}
                  disabled={urls?.next === null}
                  className="list__button list__button-pagination"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;

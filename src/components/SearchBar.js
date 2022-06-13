import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from '../assets/logo.png'

const SearchBar = () => {
  let navigate = useNavigate();
  const [valueInput, setvalueInput] = useState("");

  const handleInput = (event) => {
    setvalueInput(event.target.value);
  };

  const onHandleEnterKey = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = () => {
    console.log("SEARch");
    navigate(`/pokemon/${valueInput}`);
    //fetch(`https://pokeapi.co/api/v2/pokemon/${valueInput}`).then(resp=>resp.json()).then()
  };

  return (
    <>
     <Link to={`/`}> <img src={logo} /></Link>
   
      <input
        value={valueInput}
        onChange={handleInput}
        onKeyDown={onHandleEnterKey}
      />
      <button onClick={handleSearch}>Search</button>
    </>
  );
};

export default SearchBar;

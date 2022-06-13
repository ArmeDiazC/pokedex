import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./styles/Header.scss";

const Header = () => {
  let navigate = useNavigate();
  const [valueInput, setvalueInput] = useState("");
  const [error, setError] = useState();

  const handleInput = (event) => {
    setError(null);
    setvalueInput(event.target.value);
  };

  const onHandleEnterKey = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = async () => {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${valueInput}`);

    if (!resp.ok) {
      setError("Can't find the Pokemon");
    } else {
      navigate(`/pokemon/${valueInput}`);
    }
  };

  return (
    <div className="Header">
      <Link to={`/`} className="Header__logo">
        <img alt="logo" src={logo} />
      </Link>
      <div className="Header__searchBar">
        <input
          value={valueInput}
          onChange={handleInput}
          onKeyDown={onHandleEnterKey}
          placeholder="Search Pokemon by name or id"
          type="search"
        />
        <button onClick={handleSearch} disabled={valueInput === ""}>
          Search
        </button>
        {error ? <p className="error">{error}</p> : null}
      </div>
    </div>
  );
};

export default Header;

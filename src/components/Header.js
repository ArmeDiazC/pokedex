import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "./styles/Header.scss";

const Header = () => {
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
    <div className="Header">
      <Link to={`/`} className="Header__logo">
        {" "}
        <img src={logo} />
      </Link>
      <div className="Header__searchBar">
        <input
          value={valueInput}
          onChange={handleInput}
          onKeyDown={onHandleEnterKey}
          placeholder="Search Pokemon"
          type="search"
        />
        <button onClick={handleSearch} disabled={valueInput==""}>Search</button>
      </div>
    </div>
  );
};

export default Header;

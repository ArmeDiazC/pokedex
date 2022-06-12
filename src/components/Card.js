import { useState, useEffect } from "react";
import "./styles/Card.scss";

const Card = ({ pokemon }) => {
 
  

  return (
    <div className="card">
      <img
        className="card__img"
        src={pokemon?.sprites?.front_default}
        alt={pokemon?.name}
      />
      <div className="card__content">{pokemon?.name}</div>
      <div className="card__footer">
        <button>Add to favorite</button>
        {/* <button >Add to compare</button> */}
      </div>
    </div>
  );
};

export default Card;

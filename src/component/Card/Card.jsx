import React from "react";
import "./card.scss"; // importing css file

function Card({ name, image, id, showInfoById }) {
  //passing the pokemon id cliced to Main component
  const handleClick = (e) => {
    showInfoById(e.target.id);
  };

  return (
    <div className="card">
      <img src={image} alt="" id={id} onClick={(e) => handleClick(e)} />
      <h1>
        {id}.{name}
      </h1>
    </div>
  );
}

export default Card;

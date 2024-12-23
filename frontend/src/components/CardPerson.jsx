import React from "react";

const CardPerson = ({ name, image, service, rating }) => {
  return (
    <div className="card-person">
      <img src={image} alt={name} className="person-image" />
      <div className="person-content">
        <h2 className="person-name">{name}</h2>
        <div className="container-person">
          <div className="left">
            {service}
          </div>
          <div className="right">{rating}</div>
        </div>
      </div>
    </div>
  );
};

export default CardPerson;

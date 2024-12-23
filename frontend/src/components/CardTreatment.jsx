import React from "react";

const CardTreatment = ({
  image,
  category,
  name,
  duration,
  branchName,
  price,
}) => {
  return (
    <div className="card-treatment">
      <img src={image} alt={name} className="treatment-image" />
      <div className="treatment-content">
        <h2 className="treatment-title">{name}</h2>
        <p className="treatment-price">{category}</p>
        <p className="treatment-price">{duration}</p>
        <p className="treatment-price">{branchName}</p>
        <p className="treatment-price">{price}</p>
      </div>
    </div>
  );
};

export default CardTreatment;

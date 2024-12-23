import React, { useEffect, useState } from "react";
import axios from "axios";
import CardPerson from "./components/CardPerson";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import "./Terapist.css";

const TerapistList = ({
  selectedCategory,
  handleSelect,
  handleBack,
  selectedPerson,
}) => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/terapist/booking"
        );
        setPersons(response.data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPersons();
  }, []);

  const filteredPersons = persons.filter(
    (item) => item.category === selectedCategory
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleSelectAlert = (item) => {
    handleSelect(item); 
    alert(`You have selected ${item.name}`);
  };

  return (
    <div>
      <header className="Terapist-header">
        <h1>Select Terapist</h1>
      </header>
      <main className="Terapist-hero">
        {selectedPerson && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <h2>Selected Person:</h2>
            <CardPerson
              image={selectedPerson.image}
              name={selectedPerson.name}
              service={selectedPerson.service}
              rating={selectedPerson.rating}
            />
          </div>
        )}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {filteredPersons.map((item, index) => (
            <div key={index} style={{ margin: "10px" }}>
              <CardPerson
                image={item.image}
                name={item.name}
                service={item.service}
                rating={item.rating}
              />
              <button
                onClick={() => handleSelectAlert(item)} 
                style={{ marginTop: "10px" }}
              >
                Select
              </button>
            </div>
          ))}
        </div>
        <div className="select-person">
          <button
            onClick={handleBack} 
            style={{ marginTop: "10px" }}
          >
            Back <GoArrowLeft />
          </button>
        </div>
      </main>
    </div>
  );
};

export default TerapistList;

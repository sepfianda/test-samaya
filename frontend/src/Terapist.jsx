import React, { useEffect, useState } from "react";
import axios from "axios";
import CardPerson from "./components/CardPerson";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import "./Terapist.css";

const TerapistList = ({ selectedCategory, handleSelect, handleBack }) => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null); // Added selectedPerson state

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
    setSelectedPerson(item); // Update selectedPerson state
    alert(`You have selected ${item.name}`);
  };

  const handleBackAlert = () => {
    setSelectedPerson(null);
    alert("Going back...");
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
            <div className="back-treatment">
              <button onClick={handleBackAlert} style={{ marginTop: "20px" }}>
                <GoArrowLeft />
                Back
              </button>
            </div>
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {filteredPersons.map((item, index) => (
            <div key={index} style={{ margin: "10px", textAlign: "center" }}>
              <CardPerson
                image={item.image}
                name={item.name}
                service={item.service}
                rating={item.rating}
              />
              <button
                onClick={() => handleSelectAlert(item)}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  backgroundColor: "black", // Green background
                  color: "white", // White text
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Select <GoArrowRight style={{ marginLeft: "5px" }} />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TerapistList;

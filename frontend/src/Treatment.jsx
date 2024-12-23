import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Treatment.css";
import CardTreatment from "./components/CardTreatment";
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";

const Treatment = () => {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await axios.get("http://localhost:2000/treatments");
        setTreatments(response.data);
      } catch (error) {
        setError("Error fetching treatments");
        console.error("Error fetching treatments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTreatments();
  }, []);

  const handleSelect = (treatment) => {
    setSelectedService(treatment);
    alert(`Selected: ${treatment.name}`);
  };

  const handleBack = () => {
    setSelectedService(null);
    alert("Going back...");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <header className="Treatment-header">
        <h1>Select Treatment</h1>
      </header>
      <main className="Treatment-hero">
        {selectedService ? ( 
          <div style={{ textAlign: "left" }}>
            <h2>Selected Service:</h2>
            <CardTreatment
              image={selectedService.image}
              category={selectedService.category}
              name={selectedService.name}
              duration={selectedService.duration}
              branchName={selectedService.branchName}
              price={selectedService.price}
            />
            <div className="back-treatment">
              <button onClick={handleBack} style={{ marginTop: "20px" }}>
                <GoArrowLeft />
                Back
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {treatments.map((treatment) => (
              <div
                key={treatment.id}
                style={{ margin: "10px", textAlign: "center" }}
              >
                <CardTreatment
                  image={treatment.image}
                  category={treatment.category}
                  name={treatment.name}
                  duration={treatment.duration}
                  branchName={treatment.branchName}
                  price={treatment.price}
                />
                <button
                  onClick={() => handleSelect(treatment)} 
                  style={{ marginTop: "10px" }}
                >
                  Select <GoArrowRight />
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Treatment;

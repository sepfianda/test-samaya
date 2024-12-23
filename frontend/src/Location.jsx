import React, { useState, useEffect } from "react";
import "./Location.css";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";

const LocationSelector = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:2000/branchs");
        setLocations(response.data);
      } catch (error) {
        setError("Error fetching locations");
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleSelect = (item) => {
    setSelectedLocation(item);
    alert(`Selected: ${item.name}`);
  };

  const handleBack = () => {
    setSelectedLocation(null);
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
      <header className="Location-header">
        <h1>Select Location</h1>
      </header>
      <main className="Location-hero">
        <div>
          <table className="tabel">
            <tbody>
              <div className="item1">
                {locations.map((item) => (
                  <tr>
                    <button className="button" key={item.id} onClick={() => handleSelect(item)}>
                      <th>
                        <FaLocationDot />
                      </th>
                      <th>
                        {item.name} <br />
                        {item.address}
                      </th>
                      <th>
                        <FaBookmark />
                      </th>
                    </button>
                  </tr>
                ))}
              </div>
            </tbody>
          </table>
        </div>
        <div className="select-button">
          <button onClick={() => handleSelect(item)}>
            Select <GoArrowRight />
          </button>
        </div>
        {selectedLocation && (
          <div className="selected-location">
            <h3>Selected Location:</h3>
            <p>
              <strong>Name:</strong> {selectedLocation.name}
            </p>
            <p>
              <strong>Address:</strong> {selectedLocation.address}
            </p>
          </div>
        )}
        <div className="back-button">
          <button onClick={handleBack} className="back-button">
            <GoArrowLeft />
            Back
          </button>
        </div>
      </main>
    </div>
  );
};

export default LocationSelector;

import React, { useState } from "react";
import axios from "axios";
import "./Detail.css";
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";

const Detail = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    branchName: "",
    date: "",
    start_time: "",
    treatmentName: "",
    price: "",
    terapistName: "",
    total: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert date to ISO-8601 format
      const dateObject = new Date(formData.date);
      const isoDate = dateObject.toISOString(); // Convert to ISO string

      // Prepare data for submission
      const dataToSubmit = {
        ...formData,
        date: isoDate, // Use the ISO formatted date
      };

      const response = await axios.post(
        "http://localhost:2000/booking",
        formData
      );
      console.log(response.data);
      alert("Booking submitted successfully!"); // Alert on successful submission
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Error creating booking. Please try again."); // Alert on error
    }
  };

  const handleBack = () => {
    alert("Going back to the previous step."); // Alert on back button click
    // Add logic to navigate back if needed
  };

  return (
    <div>
      <header className="Detail-header">
        <h1>Preview</h1>
      </header>
      <main className="Detail-hero">
        <h3>Customer Information</h3>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="input your name"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone">Phone Number</label>
              <div>
                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="input your phone"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="branchName">Branch</label>
              <div>
                <input
                  type="text"
                  id="branchName"
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleChange}
                  placeholder="input branch name"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="date">Date</label>
              <div>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="start_time">Start Time</label>
              <div>
                <input
                  type="time"
                  id="start_time"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="treatmentName">Treatment Name</label>
              <div>
                <input
                  type="text"
                  id="treatmentName"
                  name="treatmentName"
                  value={formData.treatmentName}
                  onChange={handleChange}
                  placeholder="input treatment name"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="terapistName">Terapist Name</label>
              <div>
                <input
                  type="text"
                  id="terapistName"
                  name="terapistName"
                  value={formData.terapistName}
                  onChange={handleChange}
                  placeholder="input terapist name"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="terapistName">Price</label>
              <div>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="input price here"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="terapistName">Total Price</label>
              <div>
                <input
                  type="number"
                  id="total"
                  name="total"
                  value={formData.total}
                  onChange={handleChange}
                  placeholder="input total price"
                  required
                />
              </div>
            </div>
            <div className="button">
              <button type="submit">
                Next <GoArrowRight />
              </button>
            </div>
            <div className="button-back">
              <button type="button" onClick={handleBack}>
                <GoArrowLeft />
                Back
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Detail;

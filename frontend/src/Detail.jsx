import React, { useState } from "react";
import axios from "axios";
import "./Detail.css";
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";

const Detail = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    branchId: "",
    date: "",
    start_time: "",
    treatmentId: "",
    terapistId: "",
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
      const response = await axios.post(
        "http://localhost:2000/booking",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
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
              <label htmlFor="email">Email</label>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="input your email"
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
              <label htmlFor="branchId">Branch ID</label>
              <div>
                <input
                  type="text"
                  id="branchId"
                  name="branchId" 
                  value={formData.branchId}
                  onChange={handleChange}
                  placeholder="input branch ID"
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
              <label htmlFor="treatmentId">Treatment ID</label>
              <div>
                <input
                  type="text"
                  id="treatmentId"
                  name="treatmentId" 
                  value={formData.treatmentId}
                  onChange={handleChange}
                  placeholder="input treatment ID"
                  required 
                />
              </div>
            </div>
            <div>
              <label htmlFor="terapistId">Terapist ID</label>
              <div>
                <input
                  type="text"
                  id="terapistId"
                  name="terapistId" 
                  value={formData.terapistId}
                  onChange={handleChange}
                  placeholder="input terapist ID"
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
              <button
                type="button"
                onClick={() => {
                  
                }}
              >
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

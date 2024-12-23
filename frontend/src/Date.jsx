import React, { useState, useEffect } from "react";
import "./Date.css";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

const DateTime = () => {
  const availableSlots = [
    "8:30",
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
  ];

  const [date, setDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availableTerapists, setAvailableTerapists] = useState([]);
  const branchId = "your_branch_id"; 
  const treatmentId = "your_treatment_id";

  useEffect(() => {
    if (selectedSlot) {
      fetchAvailableTerapists();
    }
  }, [date, selectedSlot]);

  const fetchAvailableTerapists = async () => {
    try {
      const response = await axios.post("/terapist/booking", {
        branchId,
        date: date.toISOString().split("T")[0], 
        start_time: selectedSlot,
        treatmentId,
      });
      setAvailableTerapists(response.data.availableTerapists);
    } catch (error) {
      console.error("Error fetching available therapists:", error);
    }
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBack = () => {
    setDate(new Date());
    setSelectedSlot(null);
    alert("Going back...");
  };

  const handleConfirm = () => {
    if (selectedSlot) {
      alert(`Appointment set for ${date.toDateString()} at ${selectedSlot}`);
      
    } else {
      alert("Please select a time slot.");
    }
  };

  return (
    <div>
      <header className="Date-header">
        <h1>Select Date</h1>
      </header>
      <main className="Date-hero">
        <div className="Date-title">
          <div className="left">Set Appointment</div>
          <div className="right">
            <IoCalendarOutline />
          </div>
        </div>
        <div className="Date-subtitle">
          <div className="left">Select Date</div>
          <div className="right">
            <HiOutlineMenuAlt3 />
          </div>
        </div>
        <div className="calendar">
          <Calendar />
        </div>
        <div className="Date-subtitle">
          <div className="left">Slot Avilable</div>
          <div className="right">
            <HiOutlineMenuAlt3 />
          </div>
        </div>
        <div className="slot-grid">
          <table>
            <tbody>
              <div className="item-slot">
                {availableSlots.map((slot) => (
                  <button key={slot} onClick={() => handleSlotSelect(slot)}>
                    {slot}
                  </button>
                ))}
              </div>
            </tbody>
          </table>
        </div>
        <div className="buttons">
          <button onClick={handleBack}>Back</button>
          <button onClick={handleConfirm}>Select</button>
        </div>
      </main>
    </div>
  );
};

export default DateTime;

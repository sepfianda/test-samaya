import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Review.css";

const Review = () => {
  const [orderDetails, setOrderDetails] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({});
  const [total, setTotal] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get("http://localhost:2000/review");
        const bookingData = response.data[0]; 

        setOrderDetails({
          name: bookingData.name,
          phone: bookingData.phone,
          branchName: bookingData.branchName,
          date: bookingData.date,
          start_time: bookingData.start_time,
          treatmentName: bookingData.treatmentName,
          total: bookingData.total ,
        });

        setPaymentDetails({
          treatmentName: bookingData.treatmentName,
          price: bookingData.price,
          service: bookingData.service,
        });

        setTotal(bookingData.total);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    fetchBooking();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:2000/submit", {
        orderDetails,
        paymentDetails,
        total,
      });
      console.log("Submission successful:", response.data);
      alert("Booking submitted successfully!");
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Error submitting booking. Please try again.");
    }
  };

  return (
    <div>
      <header className="Review-header">
        <h1>
          SALONKU <br />
          BOOKING ONLINE
        </h1>
      </header>
      <main className="Review-hero">
        <h3>Review</h3>
        <p>Order Details</p>
        <table className="table">
          <tbody>
            <div className="order-details">
              <tr>
                <th>
                  <label>Name</label>
                </th>
                <th>
                  <span>{orderDetails.name}</span>
                </th>
              </tr>
              <tr>
                <th>
                  <label>Branch</label>
                </th>
                <th>
                  <span>{orderDetails.branchName}</span>
                </th>
              </tr>
              <tr>
                <th>
                  <label>Phone</label>
                </th>
                <th>
                  <span>{orderDetails.phone}</span>
                </th>
              </tr>
              <tr>
                <th>
                  <label>Date</label>
                </th>
                <th>
                  <span>{orderDetails.date} </span>
                </th>
              </tr>
              <tr>
                <th>
                  <label>Time</label>
                </th>
                <th>
                  <span>{orderDetails.start_time}</span>
                </th>
              </tr>
              <tr>
                <th>
                  <label>Treatment</label>
                </th>
                <th>
                  <span>{orderDetails.treatmentName}</span>
                </th>
              </tr>
            </div>
          </tbody>
        </table>
        <div className="payment-details">
          <p>Payment Details</p>
          <div>
            <table>
              <tbody>
                <div>
                  <tr>
                    <th>
                      <span>{paymentDetails.treatmentName}</span>
                    </th>
                    <th>
                      <span>{paymentDetails.price}</span>
                    </th>
                  </tr>
                </div>
              </tbody>
            </table>
            <hr />
            <table>
              <tbody>
                <div>
                  <tr>
                    <th>
                      <span>Service:</span>
                    </th>
                    <th>
                      <span>{paymentDetails.service}</span>
                    </th>
                  </tr>
                </div>
              </tbody>
            </table>
          </div>
        </div>
        <div className="total">
          <span>Total: {total}</span>
        </div>
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </main>
    </div>
  );
};

export default Review;

import React from "react";
import "./Home.css";
import Card from "./components/Card";

function App() {

  const cardData = [
    {
      image: "/wellness.jpg",
      title: "5 Advise For Your Beauty Routine",
      description: "aaaaaa",
    },
    {
      image: "/wellness.jpg",
      title: "5 Advise For Your Beauty Routine",
      description: "aaaaaa",
    },
  ];

  return (
    <div>
      <header className="App-header">
        <h1>
          SALONKU <br />
          BOOKING ONLINE
        </h1>
      </header>
      <main className="App-hero">
        <section>
          <p>
            Hello There, <br />
            Let's take care of your beauty
          </p>
          <button>Book Now</button>
        </section>
        <p>Feed for you</p>
        <div style={{ display: "flex" }}>
          {cardData.map((item, index) => (
            <Card
              key={index}
              image={item.image}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;

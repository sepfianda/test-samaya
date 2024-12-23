import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./Home";
import LocationSelector from "./Location";
import Treatment from "./Treatment";
import Detail from "./Detail";
import Review from "./Review";
import DateTime from "./Date";
import TerapistList from "./Terapist";

function Page() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/home" element={<App />} />
          <Route path="/branchs" element={<LocationSelector />} />
          <Route path="/treatments" element={<Treatment />} />
          <Route path="/date/booking" element={<DateTime />} />
          <Route path="/terapist/booking" element={<TerapistList />} />
          <Route path="/booking" element={<Detail />} />
          <Route path="/review" element={<Review />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Page;

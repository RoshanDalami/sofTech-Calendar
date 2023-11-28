
import { DarkModeContext } from "./components/DarkModeProvider.tsx";
import Home from "./pages/Home.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import { useContext } from "react";

import Landing from "./pages/Landing.tsx";
import Events from "./pages/Events.tsx";

const Body = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={(darkMode ? "dark" : "") + " flex min-h-screen flex-col"}>
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/:pageType?/:BSYear?/:BSMonth?" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          {/* <Route path="/converter" element={<DateConverter />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/google-api-disclosure" element={<GoogleApiDisclosure />} /> */}
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Body;

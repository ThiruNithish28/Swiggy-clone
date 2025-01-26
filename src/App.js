import { BrowserRouter, Routes, Route } from "react-router";
import { useState } from "react";

import Nav from "./componets/Nav";
import Body from "./pages/Body";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LoginForm from "./pages/LogInForm";
import Restaurant from "./componets/Restaurant";
import Footer from "./componets/Footer";
import Error from "./pages/Error";
import userContext from "./utils/userContext";
import { LocationProvider } from "./utils/locationContext";
import Home from "./pages/Home";

const App = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  return (
    <>
      <userContext.Provider value={{ user, setUser }}>
        <LocationProvider>
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/restaurants" element={<Body />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/restaurant/:resId" element={<Restaurant />} />
              <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </LocationProvider>
      </userContext.Provider>
    </>
  );
};
export default App;

import { BrowserRouter, Routes, Route } from "react-router";

import Nav from "./componets/Nav";
import Body from "./componets/Body";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LoginForm from "./pages/LogInForm";
import Restaurant from "./componets/Restaurant";
// import Restaurant2 from "./componets/Restaurannt2";

const App = () => {
  return (
    <>
  
      <BrowserRouter>
      <Nav />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/restaurant/:resId" element={<Restaurant/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;

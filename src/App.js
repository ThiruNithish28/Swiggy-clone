import { BrowserRouter, Routes, Route } from "react-router";

import Nav from "./componets/Nav";
import Body from "./pages/Body";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LoginForm from "./pages/LogInForm";
import Restaurant from "./componets/Restaurant";
import Error from "./pages/Error";

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
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;

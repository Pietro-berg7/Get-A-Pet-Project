import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import Home from "./components/pages/Home";

// components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

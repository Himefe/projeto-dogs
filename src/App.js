import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Login from "./Components/Login/Login";
import "./index.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/*" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Login from "./Components/Login/Login";
import User from "./Components/User/User";
import "./index.css";
import { UserStorage } from "./UserContext";
import ProtectedRouter from "./Components/Helper/ProtectedRouter";
import Photo from "./Components/Feed/Photo/Photo";
import NotFound404 from "./Components/Helper/NotFound404";
import Perfil from "./Components/Feed/Perfil/Perfil";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <UserStorage>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login/*" element={<Login />} />
              <Route
                path="conta/*"
                element={
                  <ProtectedRouter>
                    <User />
                  </ProtectedRouter>
                }
              />
              <Route path="/foto/:id" element={<Photo />} />
              <Route path="/*" element={<NotFound404 />} />
              <Route path="/perfil/:author" element={<Perfil />} />
            </Routes>
          </main>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;


import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./components/home/Home";
import NewList from "./components/list/NewList";
import Lists from "./components/list/Lists";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import AuthContext from "./contexts/AuthenticationContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContext>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/newList" element={<NewList />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthContext>
      </BrowserRouter>
    </>
  );
}

export default App;

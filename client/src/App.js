
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./components/home/Home";
import NewList from "./components/list/NewList";
import Lists from "./components/list/Lists";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./components/signup/Signup";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newList" element={<NewList />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

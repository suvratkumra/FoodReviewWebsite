
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./components/home/Home";
import NewList from "./components/list/NewList";
import Lists from "./components/list/Lists";
import "./App.css"
import Navbar from "./components/Navbar/Navbar";


function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newList" element={<NewList />} />
          <Route path="/lists" element={<Lists />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/home/Home';
import NewList from './components/list/NewList';
import Lists from './components/list/Lists';
import Navbar from './components/navbar/Navbar';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Authorization from './components/authorization/Authorization';
import Profile from './components/profile/Profile';
import About from './components/about/About';
import GlobalHandler from './components/globalHandler/GlobalHandler';
import Verification from './components/verify/Verification';
import './output.css';

function App() {
  return (
    <div className="bg-white min-h-screen">
      <BrowserRouter>
        <GlobalHandler />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              // <Authorization>
              <Home />
              // </Authorization>
            }
          />
          <Route path="/newList" element={<NewList />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/about"
            element={
              <Authorization>
                <About />
              </Authorization>
            }
          />
          <Route
            path="/profile"
            element={
              <Authorization>
                <Profile />
              </Authorization>
            }
          />
          <Route
            path="/new/list"
            element={
              <Authorization>
                <NewList />
              </Authorization>
            }
          />
          <Route path="/verification-page" element={<Verification />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Network from './pages/Network';
import Videos from './pages/Videos';
import Logout from './pages/Logout';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/profile' element={<Profile />} />

          <Route path='/Settings' element={<Settings />} />

          <Route path='/videos' element={<Videos />} />
          <Route path='/network' element={<Network />} />
          <Route path='/home' element={<Home />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/navbar' element={<Navbar />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

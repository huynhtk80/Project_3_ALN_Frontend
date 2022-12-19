import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Navbar />} />
        <Route path='/home' element={<Home />} />
        <Route path='Profile' element={<Profile />} />
        <Route path='/network' element={<Network />} />
        <Route path='/videos' element={<Videos />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

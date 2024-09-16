import './App.css'
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import List from './pages/hotellists/List';
import Hotel from './pages/hotel/Hotel';
import Login from './pages/login/Login';
import HotelType from './pages/hoteltype/HotelType';
import Register from './pages/register/Register';
import Success from './pages/success/Success';
import MyBookings from './pages/bookings/MyBookings';
import Cancellation from './pages/cancellation/Cancellation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/register/success' element={<Success />} />
        <Route path='/type/:type' element={<HotelType />} />
        <Route path='/bookings/:id' element={<MyBookings />} />
        <Route path='/bookings/cancel/:userid/:roomid' element={<Cancellation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

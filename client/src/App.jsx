import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Address from './component/address/Address';
import { AuthProvider } from './component/auth/AuthContext';
import BuyPage from './component/buypge/Buypage';
import Cart from './component/cart/Cart';
import Farmerlogin from './component/farmerlogin/Farmerlogin';
import FarmerSign from './component/farmersign/FarmerSign';
import ForgotPassword from './component/forgotPassword/ForgotPassword';
import Home from './component/home/Home';
import Login from './component/login/Login';
import Navbar from './component/navbar/Navbar'; // Make sure to import the Navbar
import Productdetails from './component/productdetails/Productdetails';
import Resetpassword from './component/resetPassword/resetPassword';
import Signup from './component/signup/Signup';
import Welcome from './component/welcome/Welcome';

function App() {
  // Initialize connectedPeople state
  const [connectedPeople, setConnectedPeople] = useState([]);

  // Function to add a new connection
  const addConnection = (person) => {
    setConnectedPeople((prev) => [...prev, person]);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Pass connectedPeople and addConnection to Navbar */}
        {/* <Navbar connectedPeople={connectedPeople} addConnection={addConnection} /> */}
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/home' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/farmersign' element={<FarmerSign />} />
          <Route path='/login' element={<Login />} />
          <Route path='/farmerlogin' element={<Farmerlogin />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/resetPassword/:token' element={<Resetpassword />} />
          <Route path="/buy" element={<BuyPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Productdetails />} />
          <Route path="/address" element={<Address />} />
          <Route path="/navbar" element={<Navbar />} />
          {/* Pass connectedPeople to the chat list or connected person list */}
          {/* <Route path="/conected" element={<ConnectedPersonList connectedPeople={connectedPeople} />} />
          <Route path='/chat/:username' element={<ChatWindow />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

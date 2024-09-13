import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import BuyPage from './component/buypge/Buypage';
import Cart from './component/cart/Cart';
import ForgotPassword from './component/forgotPassword/ForgotPassword';
import Home from './component/home/Home'; // Ensure 'Home' is capitalized
import Login from './component/login/Login';
import Resetpassword from './component/resetPassword/resetPassword';
import Signup from './component/signup/Signup';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/resetPassword/:token' exact element={<Resetpassword />} />
          <Route path="/buy" element={<BuyPage />} />
          <Route path="/cart" element={<Cart />} />

     
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

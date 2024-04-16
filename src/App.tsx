import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Nav from './components/Nav';
import Shop from './components/Shop';
import Foot from './components/Foot';
import Story from './components/Story';
import Profile from './components/Profile';
import { Suspense, useState } from 'react';
import Loading from './components/Loading';
import { AuthContextProvider } from './context/AuthContext';
import AuthPages from './components/AuthPages';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Signup from './components/Signup';
import VerifyEmail from './components/VerifyEmail';
import { CartProvider } from "./context/CartContext";
import Feedback from './components/Feedback';
import Admin from './components/Admin';
import { ShoppingCart } from './components/ShoppingCart';
import Checkout from './components/Checkout';
import Orders from './components/Orders';
import { Timer } from './components/Timer';


function App() {

  const [deliveryActive, setDeliveryActive] = useState();

  return (
    <Suspense fallback={<Loading />}>
      <AuthContextProvider>
        <CartProvider>
        <Router>
        <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<AuthPages><Shop /></AuthPages>}/>
            <Route path="/story" element={<Story />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin" element={<AuthPages><Admin /></AuthPages>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<AuthPages><Feedback /></AuthPages>} />
            <Route path="/checkout" element={<AuthPages><Checkout /></AuthPages>} />
            <Route path="/orders" element={<AuthPages><Orders /></AuthPages>} />
            <Route path="/timer" element={<AuthPages><Timer deliveryTime={5} /></AuthPages>} />
          </Routes>
          <ShoppingCart/>
          <Foot />
        </Router>
        </CartProvider>
      </AuthContextProvider>
    </Suspense>

  );
}

export default App;
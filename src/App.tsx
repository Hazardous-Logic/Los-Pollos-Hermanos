import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Nav from './components/Nav';
import Shop from './components/Shop';
import Foot from './components/Foot';
import Story from './components/Story';
import Profile from './pages/Profile';
import { Suspense } from 'react';
import Loading from './components/Loading';
import { AuthContextProvider } from './context/AuthContext';
import AuthPages from './components/AuthPages';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import { CartProvider } from "./context/CartContext";
import Feedback from './pages/Feedback';
import Admin from './pages/Admin';
import { ShoppingCart } from './components/ShoppingCart';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';

function App() {
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
            <Route path="/confirmation" element={<AuthPages><Confirmation /></AuthPages>} />
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
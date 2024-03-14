import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Nav from './components/Nav';
import Shop from './components/Shop';
import Foot from './components/Foot';
import Story from './components/Story';
import { Suspense } from 'react';
import Loading from './components/Loading';
import { AuthContextProvider } from './context/AuthContext';
import AuthPages from './components/AuthPages';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import AddMenuItem from './components/AddMenuItem';
import { CartProvider } from "./context/CartContext";
import { FloatingShoppingCartIcon } from './components/FloatingShoppingCartIcon';
//import { CartProvider } from "./context/CartContext";
// import Cart from './components/Cart';

// import Profile from './components/Profile';

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
            <Route path="/add" element={<AddMenuItem />} />
            {/* <Route path="/cart" element={<Cart />} /> */}
            {/* <Route path="/profile/:id" element={<Profile />} /> */}
          </Routes>
        </Router>
        <FloatingShoppingCartIcon />
        <Foot />
        </CartProvider>

      </AuthContextProvider>

    </Suspense>

  );
}

export default App;




import { Avatar, Dropdown, Navbar, Button } from 'flowbite-react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, NavLink , useNavigate} from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from '../libs/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useShoppingCart } from "../context/CartContext";

function Nav() {
  const { currentUser } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const { cartItems , clearCart } = useShoppingCart();
  const navigate = useNavigate();
  
  const handleLogout = async () => {

    if (cartItems.length > 0) {
      const confirmLogout = window.confirm("You have items in your cart. Are you sure you want to logout and lose your items?");
      if (!confirmLogout) {
        return; // Do not proceed with logout
      }
    }

    await signOut(auth);
    clearCart();
    setIsAdmin(false);
    navigate("/");
  };

useEffect(() => {
  const checkAdmin = async () => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      const userData = await getDoc(userRef);
      const user = userData.data();
      console.log(currentUser);
      console.log(user);
      if (userData && user && user.role === 'admin') {
        setIsAdmin(true);
      }
    }
  };

  checkAdmin();
}, [currentUser]);


  const userName = currentUser?.displayName || 'Default Name';
  const userEmail = currentUser?.email || 'default@email.com';

  return (
    <div className='container mx-auto  mt-5'>
      <Navbar fluid className='bg-yellow-300 shadow-xl rounded-xl'>
        <Navbar.Brand as={Link} to="/">
          <img src="/Los_Pollos.webp" className="mr-7 h-20 sm:h-36" alt="Logo" />
        </Navbar.Brand>
        <div className="flex md:order-2">
          {currentUser ? (
            <Dropdown
              className='bg-yellow-300 border-red-500'
              arrowIcon={true}
              inline
              label={
                <Avatar img={currentUser?.photoURL || ''}rounded color="pink" size="lg">
                  <div className="space-y-1 font-medium dark:text-white">
                    <div className='text-red-500'>Hola! {userName}</div>
                    <div className="text-sm text-red-500 dark:text-gray-400">{userEmail}</div>
                  </div>
                </Avatar>
              }
            >
              <Dropdown.Header className='text-red-500'>
                <span className="block text-sm">{userName}</span>
                <span className="block truncate text-sm font-medium">{userEmail}</span>
              </Dropdown.Header>
              <Dropdown.Item as={Link} to="/Profile">My profile</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Orders</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item  onClick={handleLogout}>Sign out</Dropdown.Item>

            </Dropdown>
          ) : (
            <Link to="/login">
              <Button color="failure" pill size="lg">
                Login / Register
              </Button>
            </Link>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link as={NavLink} to="/" active className="text-xl">Home</Navbar.Link>
          <Navbar.Link as={NavLink} to="/shop" className="text-xl">Order</Navbar.Link>
          <Navbar.Link as={NavLink} to="/story" className="text-xl">Our Story</Navbar.Link>
          <Navbar.Link as={NavLink} to="/contact" className="text-xl">Contact</Navbar.Link>
          {isAdmin && <Navbar.Link as={NavLink} to="/admin" className="text-xl">Admin</Navbar.Link>}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Nav;
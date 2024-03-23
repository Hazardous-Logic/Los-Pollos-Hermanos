import { Avatar, Dropdown, Navbar, Button } from 'flowbite-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, NavLink , useNavigate} from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../libs/firebase';

function Nav() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };
  console.log(currentUser);

  // const userName = 'Raeolin Pillay';
  // const userEmail = 'Raeolin@live.com';
  const userName = currentUser?.displayName || 'Default Name';
  const userEmail = currentUser?.email || 'default@email.com';

  return (
    <div className='container mx-auto mt-5'>
      <Navbar fluid rounded  className='bg-yellow-300'>
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
          <Navbar.Link as={NavLink} to="/shop" className="text-xl">Shop</Navbar.Link>
          <Navbar.Link as={NavLink} to="/order" className="text-xl">Order Online</Navbar.Link>
          <Navbar.Link as={NavLink} to="/story" className="text-xl">Our Story</Navbar.Link>
          <Navbar.Link as={NavLink} to="/contact" className="text-xl">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Nav;
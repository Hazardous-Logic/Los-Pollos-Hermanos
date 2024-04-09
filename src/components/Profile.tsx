// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db } from "../libs/firebase";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  return (
  <div className="container mx-auto my-10 rounded py-5 bg-yellow-300 w-full md:w-2/3 lg:w-1/2">
    
  </div>
  );};

export default Profile;

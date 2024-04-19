import { useState, useEffect } from "react";
import { auth, db } from "../libs/firebase";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Button } from "flowbite-react";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  fullName: string;
  birthday: string;
}

const Profile = () => {

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [updates, setUpdates] = useState<UserProfile>({
    fullName: "",
    birthday: "",
  });
  const [createdAt, setCreatedAt] = useState<string>("");
  const [lastLoginAt, setLastLoginAt] = useState<string>("");

  useEffect(() => {
    console.log(currentUser);
    const fetchUserData = async () => {
      try {
        if (currentUser) {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            if (userData) {
              setUpdates({
                fullName: userData.name || "",
                birthday: userData.birthday || "", // Set birthday if available
              });
            }
          }
          const user = auth.currentUser;
          if (user) {
            setCreatedAt(user.metadata.creationTime || "");
            setLastLoginAt(user.metadata.lastSignInTime || "");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdates({ ...updates, [name]: value });
  };

  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (currentUser) {
        await updateDoc(doc(db, "users", currentUser.uid), {
          name: updates.fullName,
          birthday: updates.birthday,
        });
        alert("Profile updated successfully!");
      } else {
        alert("User not logged in.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(
        "An error occurred while updating profile. Please try again later."
      );
    }
  };

  const deleteUserAccount = async () => {
    const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmation) {
      try {
        if (currentUser) {
          // Delete user data from Firestore
          await deleteDoc(doc(db, "users", currentUser.uid));
          
          // Delete user account from Firebase Authentication
          await currentUser.delete();
  
          alert("Your account has been deleted successfully!");
  
        } else {
          alert("User not logged in.");
        }
      } catch (error) {
        console.error("Error deleting user account:", error);
        alert("An error occurred while deleting your account. Please try again later.");
      } finally {
        navigate("/login");
      }
    }
  };
  

  return (
    <div className="container mx-auto my-10 text-center rounded-xl py-5 bg-yellow-300 w-full md:w-2/3 lg:w-1/2">
      <h2 className="text-4xl font-medium my-5 text-black text-center tracking-wider">
        Profile Settings
      </h2>
      <form onSubmit={updateProfile}>
        <div className="flex flex-wrap mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Update Your Name
            </label>
            <input
              className=" shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="name"
              type="text"
              name="fullName"
              required
              value={updates.fullName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Add Your Birthday
            </label>
            <input
              className=" shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="birthday"
              type="date"
              name="birthday"
              value={updates.birthday}
              onChange={handleChange}
            />
          </div>
        </div>
        <p className="tracking-wide font-bold text-gray-700 my-5">User ID: {currentUser?.uid}</p>
        <p className="tracking-wide font-semibold text-gray-700 my-5">Account created: {createdAt}</p>
        <p className="tracking-wide font-semibold text-gray-700 my-5=">Last login: {lastLoginAt}</p>

        <Button
          disabled={false}
          className="mx-auto mt-5"
          pill
          color="success"
          type="submit"
        >
          {"Update Profile"}
        </Button>

        <Button
          className="mx-auto mt-5"
          pill
          color="failure"
          onClick={deleteUserAccount}
        >
          Delete Account
        </Button>


      </form>
    </div>
  );
};

export default Profile;

//Custom Hook to check if the user is an admin

import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { db } from "../libs/firebase";
import { doc, getDoc } from "firebase/firestore";

export function UseCheckAdmin(): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [isAdmin, setIsAdmin] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const checkAdmin = async () => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userData = await getDoc(userRef);
        const user = userData.data();
        // console.log(currentUser);
        // console.log(user);
        if (userData && user && user.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    };

    checkAdmin();
  }, [currentUser]);
  return [isAdmin, setIsAdmin] ;
}

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "./Spinner";
import { auth } from "../libs/firebase";

const AuthPages = ({ children }: { children: JSX.Element }) => {
  const [isUser, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.authStateReady().then(() => {
      if (!auth.currentUser) {
        setIsAuth(false);
      } else {
        setIsAuth(true);
      }
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-[400px] ">
          <Spinner customStyle="animate-spin" w="48" h="48" />
        </div>
      ) : (
        <>{isUser ? <>{children}</> : <Navigate to={"/login"} />}</>
      )}
    </>
  );
};

export default AuthPages;

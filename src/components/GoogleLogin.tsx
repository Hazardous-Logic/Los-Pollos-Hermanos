import {
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { auth, db } from "../libs/firebase";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

interface Props {
  message: string;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const GoogleLogin = ({ message, isLoading, setIsLoading }: Props) => {
  const [errHandler, setErrHandler] = useState({
    isError: false,
    errorMsg: "",
  });

  const [signInLoading, setSignInLoading] = useState(false);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();

  async function handleLogin() {
    try {
      setIsLoading(true);
      setSignInLoading(true);
      setErrHandler({ isError: false, errorMsg: "" });
      await signInWithRedirect(auth, provider);
    } catch (error) {
      setIsLoading(false);
      setSignInLoading(false);
      setErrHandler({
        isError: true,
        errorMsg: "Error while log in with google.",
      });
    }
  }

  const authResult = async () => {
    try {
      setSignInLoading(true);
      const user = await getRedirectResult(auth);
      return user;
    } catch (error) {
      setIsLoading(false);
      setSignInLoading(false);
      setErrHandler({
        isError: true,
        errorMsg: "Error while log in with google.",
      });

      return null;
    }
  };

  useEffect(() => {
    authResult()
      .then(async (res) => {
        setSignInLoading(false);
        if (!res) {
          return;
        }

        const docRef = doc(db, "users", res.user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          navigate("/");
          return;
        }

        await setDoc(docRef, {
          name: res.user.displayName,
          email: res.user.email,
          timeStamp: serverTimestamp(),
        });
        navigate("/");
      })
      .catch(() => {
        setIsLoading(false);
        setSignInLoading(false);
        setErrHandler({
          isError: true,
          errorMsg: "Error while log in with google.",
        });

        return null;
      });
  }, []);

  return (
    <>
      <button
        onClick={handleLogin}
        type="button"
        className=" hover:scale-95 duration-100 ease-in bg-white flex mt-10 w-[100%] md:w-[400px] border-2 border-solid shadow-sm border-slate-400 py-2 px-10 md:px-16 rounded-md items-center justify-center disabled:bg-gray-50 "
        disabled={isLoading}
      >
        {signInLoading ? (
          <>
            <div className="animate-spin mr-2 ">
              <Spinner />
            </div>
            <p>{message}</p>
          </>
        ) : (
          <>
            <svg
              className="mr-2 h-6 w-6"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="github"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              ></path>
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              ></path>
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              ></path>
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              ></path>
              <path d="M1 1h22v22H1z" fill="none"></path>
            </svg>
            <p>{message}</p>
          </>
        )}
      </button>

      <div className="w-[100%] md:w-[400px] mx-auto">
        {errHandler.isError ? (
          <div className="  bg-red-600 mt-3 rounded-md px-3 py-2 text-white">
            {errHandler.errorMsg}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default GoogleLogin;

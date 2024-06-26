import React, { useState, useContext } from "react";
import GoogleLogin from "./GoogleLogin";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

import { auth } from "../libs/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const [errHandler, setErrHandler] = useState({
    isError: false,
    errorMsg: "",
  });

  const [emailNotVerified, setEmailNotVerified] = useState(false);

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Navigate to="/" />;
  }

  const FIREBASE_ERRORS = {
    "auth/email-already-in-use": "A user with that email already exists",
    "auth/weak-password":
      "Please check your password. It should be 6+ characters",
    "auth/user-not-found": "Invalid email or password",
    "auth/invalid-credential": "Invalid email or password",
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formValues = new FormData(form);

    try {
      // this is a trick to resolve the issue to resolve the authStateChanged when user verifies their email and login then it doesnot changes as it is same as signup
      await signOut(auth);
      setIsLoading(true);
      setEmailNotVerified(false);
      setErrHandler({ isError: false, errorMsg: "" });
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formValues.get("email") as string,
        formValues.get("password") as string
      );
      if (userCredential.user) {
        if (!userCredential.user.emailVerified) {
          setEmailNotVerified(true);
          setErrHandler({
            isError: true,
            errorMsg: "Please verify your mail before logging in.",
          });
        } else {
          navigate("/");
        }
      }
    } catch (error: unknown) {
      const err = error as FirebaseError;
      console.log("Firebase Error Code:", err.code); // Debug log
      console.log("Firebase Error Message:", err.message); // Debug log
      console.log("Error Object:", err); // Debug log
      console.log("FIREBASE_ERRORS:", FIREBASE_ERRORS); // Debug log
      console.log("Error Message:", FIREBASE_ERRORS[err.code as keyof typeof FIREBASE_ERRORS]); // Debug log
      setErrHandler({
        isError: true,
        errorMsg: FIREBASE_ERRORS[err.code as keyof typeof FIREBASE_ERRORS] || "Login error. Please check your credentials",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-10 rounded-xl py-5 text-center bg-yellow-300 w-full md:w-2/3 lg:w-1/2">
      <h2 className="text-4xl font-medium my-5 text-black text-center tracking-wider">Log in</h2>
      <div className="auth-options w-full flex flex-col items-center justify-center">
        <GoogleLogin
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          message="Sign in with Google"
        />
        <div className="mt-5 mb-3 w-full md:w-[380px] flex items-center justify-center">
          <div className="before-or w-[100%] h-[2px] bg-gray-900 mr-2"></div>
          <p className="text-black or">OR</p>
          <div className="after-or w-[100%] h-[2px] bg-gray-900 ml-2"></div>
        </div>
        <form onSubmit={handleLogin} className="w-[100%] mx-auto md:w-auto">
          <label htmlFor="email" className="mt-5 block text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="border-slate-400 px-3 w-full md:w-[400px] py-2 rounded-md border-2 "
          />
          <label htmlFor="password" className="mt-5 block text-gray-600">
            Password
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              id="password"
              required
              className="border-slate-400 px-3 w-full md:w-[400px] py-2 rounded-md border-2 "
            />
            <button
              type="button"
              aria-label={showPass ? "Password Visible" : "Password Invisible"}
              onClick={() => {
                setShowPass((prev) => !prev);
              }}
            >
              {showPass ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 select-none text-gray-700 cursor-pointer h-6 absolute top-2 right-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 select-none text-gray-700 cursor-pointer h-6 absolute top-2 right-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  ></path>
                </svg>
              )}
            </button>

            <div className="mt-2 flex justify-end">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </div>
          {errHandler.isError ? (
            <div className="w-[100%] text-center mx-auto md:w-auto bg-red-600 mt-3 rounded-md px-3 py-2 text-white">
              {errHandler.errorMsg}

              {emailNotVerified ? (
                <div className="  w-full flex items-center  mt-5 mb-2 justify-center">
                  <Link className="border-2 px-3 py-1 rounded-md" to="/verify">
                    Verify Email
                  </Link>
                </div>
              ) : null}
            </div>
          ) : null}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-red-700 mt-5 w-full px-10 py-2 rounded-full text-white hover:scale-95 duration-100 ease-in "
            >
              Log in
            </button>
          </div>
        </form>
        <p className="mt-5 text-left">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

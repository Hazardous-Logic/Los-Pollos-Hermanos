import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../libs/firebase";

const ForgotPassword = () => {
  const [sentMail, setSentMail] = useState(false);

  const [errHandler, setErrHandler] = useState({
    isError: false,
    errorMsg: "",
  });
  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formValues = new FormData(form);

    try {
      await sendPasswordResetEmail(auth, formValues.get("email") as string);
      setSentMail(true);
    } catch (error) {
      setErrHandler({
        isError: true,
        errorMsg: "Error while sending email. Trying again later.",
      });
    }
  };
  return (
    <div className="container mx-auto my-10 rounded py-5 bg-yellow-300 w-full md:w-2/3 lg:w-1/2">
      <h2 className="text-4xl font-medium mt-10 text-center">Password Reset</h2>
      <div className="auth-options w-full flex flex-col items-center justify-center">
        <form
          onSubmit={handleForgotPassword}
          className="w-[100%] mx-auto md:w-auto mt-5"
        >
          <label htmlFor="email" className="mt-5 block text-gray-600">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="border-slate-400 px-3 w-full md:w-[400px] py-2 rounded-md border-2 "
          />

          {sentMail ? (
            <>
              <div className="  w-full md:w-[400px] flex flex-col gap-3 items-center justify-center bg-green-600 text-white mt-5 rounded-md px-3 py-2">
                <h3 className="font-semibold">Mail sent successfully.</h3>
                <p>
                  Please check your spam folder if you can't find it in inbox.
                </p>

                <Link
                  to="/login"
                  className="border-white border-2 px-3 py-1 rounded-md"
                >
                  Back to Login
                </Link>
              </div>
            </>
          ) : null}

          {errHandler.isError ? (
            <div className="w-[100%] mx-auto md:w-auto bg-red-600 mt-3 rounded-md px-3 py-2 text-white">
              {errHandler.errorMsg}
            </div>
          ) : null}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-slate-800 mt-5 w-full px-10 py-2  border-2 border-solid border-mainbg rounded-md text-white hover:scale-95 duration-100 ease-in "
            >
              Send Reset Mail
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

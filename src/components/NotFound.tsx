// NotFound.tsx

import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";


const NotFound = () => {

    const navigate = useNavigate();
  return (
    <div className="container mx-auto my-10 rounded-xl text-center items-center flex flex-col py-5 bg-yellow-300 w-full md:w-2/3 lg:w-1/2">
      <h1 className="text-3xl font-medium mt-10 text-black text-center">
        404 - Page Not Found
      </h1>
      <p className="mt-5 text-lg">
        Seems like you have lost your way Amigo. 🤠
      </p>
      <Button
            className="mt-3 mb-3"
            pill
            color="failure"
            onClick={() => navigate("/")}
          >
            Go Home
          </Button>
    </div>
  );
};

export default NotFound;
import { Button } from "flowbite-react";
import AddMenuItem from "./AddMenuItem";
import DeleteMenuItem from "./DeleteMenuItem";
import { UseCheckAdmin } from "../hooks/UseCheckAdmin";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [isAdmin] = UseCheckAdmin();
  const navigate = useNavigate();

  return (
    <>
      {isAdmin ? (
        <>
          <AddMenuItem />
          <DeleteMenuItem />
        </>
      ) : (
        <div className="container mx-auto my-10 rounded-xl text-center items-center flex flex-col py-5 bg-yellow-300 w-full md:w-2/3 lg:w-1/2">
          <p className="font-semibold">You lack the privileges to access this page. 🙂</p>
          <Button
            className="mt-3 mb-3"
            pill
            color="failure"
            onClick={() => navigate("/")}
          >
            Go Home
          </Button>
        </div>
      )}
    </>
  );
};

export default Admin;
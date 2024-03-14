import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="h-[350px] flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold">Welcome to App</h2>

      <Link
        to={currentUser ? "/dashboard" : "/login"}
        className="px-5 mt-5 py-2 rounded-md bg-blue-700 text-white"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Home;

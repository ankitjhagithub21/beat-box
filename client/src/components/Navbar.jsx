import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setUser } from "../redux/slices/userSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/user/logout`,{
          method:"POST",
          credentials:'include'
        }
      );
      const data = await res.json();

      if (data.success) {
        dispatch(setUser(null));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="w-full fixed top-0 p-5 z-50  bg-black border-b flex items-center justify-between gap-5">
      <NavLink to="/" className=" flex items-center gap-1">
        <img src="/vite.svg" alt="logo" />
        <span className="text-white font-serif text-xl ">BeatBox</span>
      </NavLink>
      <SearchBar />
      {user ? (
        <div>
          <div className="w-10 rounded-full  h-10 overflow-hidden cursor-pointer">
            <img
              src={user.profileImg}
              alt={user.fullName}
              className="rounded-full w-full cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
          {isOpen && (
            <div className="bg-white text-gray-800 flex flex-col gap-3 p-3 rounded-lg mt-1 absolute right-5">
              <NavLink
                to={"/"}
                className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg"
              >
                Your Profile
              </NavLink>
              <button
                className="py-2 px-4 hover:bg-green-600 rounded-lg bg-green-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <NavLink to={"/register"}>Sign up</NavLink>
          <NavLink
            to={"/login"}
            className="py-2 px-4 rounded-full bg-white text-black"
          >
            Log in
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

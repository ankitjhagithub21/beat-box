import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <nav className="w-full fixed top-0 p-5 z-50  bg-black border-b flex items-center justify-between gap-5">
      <NavLink to="/" className="md:flex hidden items-center gap-1">
        <img src="/vite.svg" alt="logo" />
        <span className="text-white font-serif text-xl ">BeatBox</span>
      </NavLink>
      <SearchBar />
      {user ? (
        <div className="w-10 rounded-full  h-10 overflow-hidden cursor-pointer">
          <img
            src={user.profileImg}
            alt={user.fullName}
            className="rounded-full w-full"
          />
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

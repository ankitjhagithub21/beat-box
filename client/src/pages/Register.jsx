import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { setUser } from "../redux/slices/userSlice";
import toast from "react-hot-toast";

const Register = () => {
  const [fullName,setFullName] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({fullName, email, password }),
        }
      );
      const data = await res.json();
      if (data.success) {
        dispatch(setUser(data.user));
        navigate("/");
      }else{
         toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 w-full">
      <form
        className="max-w-md rounded-xl shadow-xl w-full mx-auto p-5 bg-[#121212]"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-3xl mb-5">Sign Up</h2>
        <div className="flex flex-col gap-1 mb-5">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter full name"
            className="bg-transparent border rounded-lg p-3"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="bg-transparent border rounded-lg p-3"
            required
          />
        </div>
        <div className="flex flex-col gap-1 mt-5">
          <label htmlFor="password">Password</label>
          <div className="flex items-center border rounded-lg ">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="bg-transparent rounded-lg p-3 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="mx-2"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>

        <button className="mt-5 text-center p-3 bg-green-600 text-gray-800 font-bold hover:bg-green-700 rounded-full w-full">
          {loading ? "Loading..." : "Create Account"}
        </button>
        <p className="mt-5  text-sm text-center">Already have an account ? <Link to={"/login"} className="underline text-green-500">Login here</Link></p>
      </form>
    </div>
  );
};

export default Register;

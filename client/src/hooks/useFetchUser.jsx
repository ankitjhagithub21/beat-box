import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../redux/slices/userSlice";

const useFetchUser = () => {
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.user);
  const apiUrl = `${import.meta.env.VITE_SERVER_URL}/api/user/me`;

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(apiUrl, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          dispatch(setUser(data.user));
        } else {
          dispatch(setUser(null));
        }
      } catch (error) {
        console.log(error);
        dispatch(setUser(null));
      } finally {
        dispatch(setLoading(false));
      }
    };
   if(!user){
    getUser();
   }
  }, []);
};

export default useFetchUser;

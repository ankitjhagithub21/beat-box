import { useDispatch, useSelector } from "react-redux";
import {  useEffect} from "react";
import { setLoading,setSongs } from "../redux/slices/songSlice";

const useFetchSongs = () => {
    const dispatch = useDispatch()
    const {query,pageNumber} = useSelector((state)=>state.song)
    
    const apiUrl = `https://saavn.dev/api/search/songs?query=${query}&page=${pageNumber}`;
    
    useEffect(() => {
      const getAllSongs = async () => {
        dispatch(setLoading(true))
        try {
          const res = await fetch(apiUrl);
          const { data } = await res.json();
         dispatch(setSongs(data.results))
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(setLoading(false));
        }
      };
      getAllSongs();
    }, [pageNumber,query]);
  
}

export default useFetchSongs
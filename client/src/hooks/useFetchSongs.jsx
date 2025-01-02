import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { setLoading, setSongs } from "../redux/slices/songSlice";

const useFetchSongs = () => {
  const dispatch = useDispatch();
  const { query, pageNumber } = useSelector((state) => state.song);

  const apiUrl = `https://saavn.dev/api/search/songs?query=${query}&page=${pageNumber}`;

  const getAllSongs = useCallback(async () => {
    if (!query) return; // Avoid fetching if query is empty

    dispatch(setLoading(true));
    try {
      const res = await fetch(apiUrl);
      const { data } = await res.json();

      
      const songData = data.results.map((song) => {
        return {
          id: song.id,
          name: song.name,
          year: song.year,
          artists: song.artists?.primary || "Unknown",
          downloadUrl:
            song.downloadUrl?.[song.downloadUrl.length - 1]?.url || "",
          image: song.image?.[2]?.url || "",
          album: song.album || "Unknown",
        };
      });


        dispatch(setSongs(songData));
      
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [pageNumber, query]);

  useEffect(() => {
    getAllSongs();
  }, [getAllSongs]);

  return null; 
};

export default useFetchSongs;

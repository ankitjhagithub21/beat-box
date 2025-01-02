import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { MdDownload } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { setUser } from "../redux/slices/userSlice";

const SongDetails = () => {
  const { songs, songIndex } = useSelector((state) => state.song);
  const {user} = useSelector(state=>state.user)
  const dispatch = useDispatch()

  const currSong = songs[songIndex];
  if (!currSong) {
    return <Navigate to={"/"} />;
  }
  

  const handleDownload = async () => {
    const toastId = toast.loading("Song Downloading...")
    try {
      const response = await fetch(currSong.downloadUrl);
      const blob = await response.blob();

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${currSong.name}.mp3`;

      // Append the link to the document
      document.body.appendChild(link);

      // Trigger a click event on the link
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);
      
      toast.success("Song downloaded.")
    } catch (error) {
     
      toast.error('Error downloading the file:', error);
    }finally{
      toast.dismiss(toastId)
    }
  };

  const handleAddToFav = async() =>{
      
   
      try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/add-song`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          credentials:"include",
          body:JSON.stringify({song:currSong})
        })

        const data = await res.json();
        if(data.success){
          dispatch(setUser({...user,songs:data.songs}))        
          toast.success(data.message)
        }else{
          toast.error(data.message)
        }
      }catch(error){
        console.log(error)
      }
  }

  
  return (
    <div className="max-w-6xl p-5 mx-auto">
      <div className="flex flex-wrap">
        <div className="lg:w-1/4 w-full">
          <img
            src={currSong.image}
            alt={currSong.name}
            className="rounded-lg border"
          />
        </div>
        <div className="lg:w-3/4 w-full p-5">
          <h1 className="text-3xl mb-2">{currSong.name}</h1>
          <p>Year : {currSong.year}</p>
          <div className="flex  items-center mt-5 gap-5">
            <button onClick={handleDownload} className="flex items-center gap-1 text-sm bg-green-600 hover:bg-green-700 rounded-full px-3 py-1.5">
              Download Song <MdDownload />
            </button>
            <button className="border flex items-center gap-2 px-3 rounded-full py-1 text-sm" onClick={handleAddToFav}>
              Add To Favourite <FaHeart />{" "}
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-2xl my-5">Song Artists</h1>
          <div className="flex gap-5 flex-wrap">
            {currSong.artists.map((artist) => {
              return (
                <div
                  className="flex flex-col gap-1 text-center items-center "
                  key={artist.id}
                >
                  {artist.image[2]?.url && (
                    <>
                      <img src={artist.image[1].url} alt={artist.name} className="rounded-lg" />
                      <p>{artist.name}</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetails;

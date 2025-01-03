import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";


const Profile = () => {
  const { user } = useSelector((state) => state.user);
  
const navigate = useNavigate()

  const onSongClick = (name) => {
  
      const slug = name.split(" ").join("-")
      navigate(`/song/${slug}`)
    }


  if(!user){
    return <Navigate to="/"/>
  }


  return (
    
    <div className="max-w-6xl mx-auto py-12 px-5">
      <h2 className="text-2xl mb-1">Welcome {user.fullName}</h2>
      <p>Your favourite songs.</p>
      <div className="grid lg:grid-cols-6 grid-cols-3 gap-3 mt-5">
    {user.songs.map((song) => {
      return (
        <div key={song.id} onClick={()=>onSongClick(song.name)}>
          <div className="relative">
            <img
              src={song.image}
              alt={song.name}
              className="rounded-lg border cursor-pointer w-full"
            />
          </div>

          <p className="text-white text-sm p-1 whitespace-nowrap overflow-hidden">
            {song.name}
          </p>
        </div>
      );
    })}
  </div>
    </div>

  );
};

export default Profile;

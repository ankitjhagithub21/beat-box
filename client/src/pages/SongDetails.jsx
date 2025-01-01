import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { MdDownload } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

const SongDetails = () => {
  const { songs, songIndex } = useSelector((state) => state.song);
  const currSong = songs[songIndex];
  console.log(currSong);
  if (!currSong) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="max-w-6xl p-5 mx-auto">
      <div className="flex flex-wrap">
        <div className="lg:w-1/4 w-full">
          <img
            src={currSong?.image[2].url}
            alt={currSong.name}
            className="rounded-lg border"
          />
        </div>
        <div className="lg:w-3/4 w-full p-5">
          <h1 className="text-3xl mb-2">{currSong.name}</h1>
          <p>Year : {currSong.year}</p>
          <div className="flex  items-center mt-5 gap-5">
            <button className="flex items-center gap-1 text-sm bg-green-600 hover:bg-green-700 rounded-full px-3 py-1.5">
              Download Song <MdDownload />
            </button>
            <button className="border flex items-center gap-2 px-3 rounded-full py-1 text-sm">
              Add To Favourite <FaHeart />{" "}
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-2xl my-5">Song Artists</h1>
          <div className="flex gap-3">
            {currSong.artists.primary.map((artist) => {
              return (
                <div
                  className="flex flex-col gap-1 text-center items-center  cursor-pointer hover:scale-105"
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

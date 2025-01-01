import React from 'react'
import AudioPlayer from "react-h5-audio-player"
import 'react-h5-audio-player/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSongIndex,setPageNumber } from '../redux/slices/songSlice';
const Player = () => {
 const {songIndex,songs} = useSelector(state=>state.song);
 const dispatch = useDispatch()
 const len = songs[songIndex]?.downloadUrl.length || 0;
 const src =  songs[songIndex]?.downloadUrl[len-1].url
  const onClickPrev = () => {
    if (songIndex >= 1) {
     dispatch(setSongIndex(songIndex - 1));
    }
  };


  const onClickNext = () => {
    if (songIndex < songs.length - 1) {
     dispatch(setSongIndex(songIndex + 1))
    } else {
     dispatch(setPageNumber(pageNumber+1))

    }
  };
  const onSongEnd = () => {
    onClickNext();
  };

   
  return (
    <div className='fixed bottom-0 w-full z-50'>
         <AudioPlayer
         autoPlay={true}
         autoPlayAfterSrcChange={true}
         src={src}
         onClickNext={onClickNext}
         onClickPrevious={onClickPrev}
         showSkipControls={true}
         showJumpControls={false}
        
         onEnded={onSongEnd}
      />
    </div>
  )
}

export default Player
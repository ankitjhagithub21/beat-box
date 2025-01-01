import React from 'react'
import AudioPlayer from "react-h5-audio-player"
import 'react-h5-audio-player/lib/styles.css';
const Player = ({src,onNextButtonClick,onPrevButtonClick,onSongEnd}) => {
   const url = src ?  src[src.length-1].url : null
   
  return (
    <div className='fixed bottom-0 w-full z-50'>
         <AudioPlayer
         
         autoPlay={true}
         src={url}
         onClickNext={onNextButtonClick}
         onClickPrevious={onPrevButtonClick}
         showSkipControls={true}
         showJumpControls={false}
         onEnded={onSongEnd}
      />
    </div>
  )
}

export default Player
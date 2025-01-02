import React from 'react'
import AudioPlayer from "react-h5-audio-player"
import 'react-h5-audio-player/lib/styles.css';

const Player = ({src,onClickNext,onClickPrev,onSongEnd}) => {
 

   
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
import React, { useState } from 'react'

const Poster = (props) => {
  const bgUrl = 'https://image.tmdb.org/t/p/original/'
  const [pop, setPop] = useState(false);

  return (
    <div className='poster-wrap'>
      <button type='button' className='poster-btn' onClick={()=>{setPop(!pop)}}>
        POSTER
      </button>
      <div className={`poster-pop ${pop ? 'on' : ''}`} onClick={()=>{setPop(false)}}>
        <img src={bgUrl + props.path}></img>
      </div>
    </div>
  )
}

export default Poster
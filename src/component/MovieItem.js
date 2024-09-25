import React, { useEffect, useState } from 'react'
import cast_nodata from '../imgs/cast_nodata.svg'

const MovieItem = (props) => {
  
  const bgUrl = 'https://image.tmdb.org/t/p/original/'
  const youtubeUrl = 'https://www.youtube.com/embed/'
  const [nodata, setNodata] = useState(false) 
  const posterType = typeof(props.poster)


  useEffect(()=>{
    if(posterType == 'string') {
      setNodata(false)
    } else {
      setNodata(true)
    }
  },[posterType])

  let w = '';
  let h = '';

  if(props.video) {
    w = "400px";
    h = "295px";
  } else if(props.trailer){
    w = "100%";
    h = props.height;
  }

  console.log(props.height);

  return (
    <div className='movie-item'>
      {
        props.trailer || props.video ? 
          <iframe src={youtubeUrl + props.poster + '&rel=0'} width={w} title="video" height={h} allowFullScreen autoPlay='1' />
          :
          <img src={nodata ? cast_nodata : bgUrl + props.poster} alt='' />
      }
      <p className='title'>{props.title}</p>
    </div>
  )
}

export default MovieItem
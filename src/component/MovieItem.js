import React from 'react'
import cast_nodata from '../imgs/cast_nodata.jpg'

const MovieItem = (props) => {
  
  const bgUrl = 'https://image.tmdb.org/t/p/original/'
  const youtubeUrl = 'https://www.youtube.com/embed/'

  let w = '';
  let h = '';

  if(props.video) {
    w = "400px";
    h = "295px";
  } else if(props.trailer){
    w = "240px";
    h = "135px";
  }

  return (
    <div className='movie-item'>
      {
        props.trailer || props.video ? 
          <iframe src={youtubeUrl + props.poster + '&rel=0'} width={w} title="video" height={h} allowFullScreen autoPlay='1' />
          :
          // <img src={props.poster.length > 4 ? cast_nodata : bgUrl + props.poster} alt='' />
          <img src={bgUrl + props.poster} alt='' />
      }
      <p className='title'>{props.title}</p>
    </div>
  )
}

export default MovieItem
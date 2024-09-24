import React from 'react'

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
          <img src={bgUrl + props.poster} alt='' />
      }
      <p className='title'>{props.title}</p>
    </div>
  )
}

export default MovieItem
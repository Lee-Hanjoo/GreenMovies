import React from 'react'

const MovieItem = (props) => {
  
  const bgUrl = 'https://image.tmdb.org/t/p/original/'
  const youtubeUrl = 'https://www.youtube.com/embed/'

  return (
    <div className='movie-item'>
      {
        props.trailer ? 
          <iframe src={youtubeUrl + props.poster} width="240px" title="video" height="135px" allowFullScreen autoPlay='1' />
          :
          <img src={bgUrl + props.poster} alt='' />
      }
      <p className='title'>{props.title}</p>
    </div>
  )
}

export default MovieItem
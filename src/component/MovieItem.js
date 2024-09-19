import React from 'react'

const MovieItem = (props) => {
  
  const bgUrl = 'https://image.tmdb.org/t/p/original/'

  return (
    <div className='movie-item'>
      {
        props.trailer ? 
          <img src={`${process.env.PUBLIC_URL}/assets/imgs/trailer_01.jpg`} alt='' />
          :
          <img src={bgUrl + props.poster} alt='' />
      }
      <p className='title'>{props.title}</p>
    </div>
  )
}

export default MovieItem
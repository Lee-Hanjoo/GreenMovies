import React from 'react'

const MovieItem = (props) => {
  return (
    <div className='movie-item'>
      {
        props.trailer ? 
          <img src={`${process.env.PUBLIC_URL}/assets/imgs/trailer_01.jpg`} alt='' />
          :
          <img src={`${process.env.PUBLIC_URL}/assets/imgs/movie_01.jpg`} alt='' />
      }
      <p className='title'>Borderlands11</p>
    </div>
  )
}

export default MovieItem
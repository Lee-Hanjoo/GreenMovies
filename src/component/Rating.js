import React from 'react'

const Rating = ({movie}) => {
  return (
    <div className='rating-wrap'>
      <p>RATING</p>
      <p>{movie.vote_average}<span>/ 10</span></p>
    </div>
  )
}

export default Rating
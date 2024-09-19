import React from 'react'

const Rating = ({movies}) => {

  const voteAverage = movies[0].vote_average.toFixed(1);

  return (
    <div className='rating-wrap'>
      <p>RATING</p>
      <p>{voteAverage}<span>/ 10</span></p>
    </div>
  )
}

export default Rating
import React, { useEffect } from 'react'
import store from '../state/store';

const Rating = ({movies}) => {

  const {main, storeMovieIdx} = store();
  const voteAverage = main?.movieTrending[storeMovieIdx]?.vote_average.toFixed(1);

  useEffect(() => {
  }, [storeMovieIdx])

  return (
    <div className='rating-wrap'>
      <p>RATING</p>
      <p>{voteAverage}<span>/ 10</span></p>
    </div>
  )
}

export default Rating
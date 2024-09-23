import React from 'react'

const Rating = (props) => {

  return (
    <div className='rating-wrap'>
      <p>RATING</p>
      <p>{props.score}<span>/ 10</span></p>
    </div>
  )
}

export default Rating
import React from 'react'
import MovieItem from '../component/MovieItem';

const List = () => {

  return (
    <div className='list wrap'>
      <div className='sort-wrap'>
        <ul>
          <li>ACTION</li>
          <li>ROMANCE</li>
          <li>ACTION</li>
        </ul>
      </div>
      <ul className='movie-list-box'>
        <li>
          <MovieItem />
        </li>
        <li>
          <MovieItem />
        </li>
        <li>
          <MovieItem />
        </li>
      </ul>
    </div>
  )
}

export default List
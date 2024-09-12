import React from 'react'
import MovieItem from '../component/MovieItem';
import Sort from '../component/Sort';

const List = () => {

  return (
    <div className='list wrap'>
      <div className='sort-wrap'>
        <Sort />
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
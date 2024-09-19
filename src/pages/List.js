import React, { useEffect, useRef, useState } from 'react'
import MovieItem from '../component/MovieItem';
import Sort from '../component/Sort';
import Search from '../component/Search';

const List = ({movies}) => {

  return (
    <div className='list wrap'>
      <div className={`list-top-wrap`}>
        <div className='sort-wrap'>
          <Sort list={['action','romance','comedy']}/>
          <Sort chk list={['en','fr','ko']}/>
        </div>
        <Search />
      </div>
      <ul className='movie-list-box'>
        {movies.map((movie, i) => (
          <li key={i}>
            <MovieItem title={movie.original_title} bg={movie.backdrop_path} poster={movie.poster_path}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List
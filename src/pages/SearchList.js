import React, { useEffect, useRef, useState } from 'react'
import MovieItem from '../component/MovieItem';
import Sort from '../component/Sort';
import Search from '../component/Search';
import store from '../state/store';

const SearchList = () => {

  let {dataCtrl, list} = store();

  useEffect(() => {
    const fetchData = async () => {
      const res = await dataCtrl({t:'list'});  
    };
    
    fetchData();
  }, [dataCtrl]);

  let movies = list;
  

  return (
    <div className='search-list wrap'>
      <div className={`search-list-top-wrap`}>
        <div className='sort-wrap'>
          <Sort list={['Movies','Tv Series']}/>
          <Sort chk list={['action','romance','comedy','horror','animation','crime','drama']}/>
        </div>
        <Search />
      </div>
      <ul className='movie-list-box'>
        {movies.map((movie, i) => (
          <li key={i} onClick={()=>{}}>
            <MovieItem title={movie.title} poster={movie.poster_path}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchList
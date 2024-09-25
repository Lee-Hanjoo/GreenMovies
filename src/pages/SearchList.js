import React, { useEffect, useRef, useState } from 'react'
import MovieItem from '../component/MovieItem';
import Sort from '../component/Sort';
import Search from '../component/Search';
import store from '../state/store';
import { api } from '../api/tmdb';

const SearchList = () => {

  let {myState, list, setList, genre} = store();
  const [loading, setLoading] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(false);


  const getMovieTvData = async (genre, withOriginalLanguage, withTextQuery, sortBy) => {

    let contType = myState;
    const res = await api.list(contType, genre, withOriginalLanguage, withTextQuery, sortBy);
    
    setList(res)
    setLoading(false);
  }
  
  useEffect(() => {
    getMovieTvData(genre, withOriginalLanguage, withTextQuery, sortBy)
  }, [])

  
  if (loading) {
    return <div>Loading...</div>
  }


  return (
    <div className='search-list wrap'>
      <div className={`search-list-top-wrap`}>
        <div className='top'>
          <div className='sort-box'>
            <Sort state list={['Movies','Tv Series']}/>
            <Sort lang chk icon list={['en', 'fr', 'ko', 'ja', 'zh', 'th']}/>
          </div>
          <Search />
        </div>
        <div className={`bottom ${bottomOpen ? 'on' : ''}`}>
          <button type='button' className='sort-flip-btn' onClick={()=>{setBottomOpen(!bottomOpen)}}></button>
          <Sort genre chk multiple list={{
            'adventure':12,
            'fantasy':14,
            'animation':16,
            'drama':18,
            'horror':27,
            'action':28,
            'comedy':35,
            'history':36,
            'western':37,
            'thriller':53,
            'crime':80,
            'documentary':99,
            'sf':878,
            'mystery':9648,
            'music':10402,
            'romance':10749,
            'family':10751,
            'war':10752,
            'tv movie':10770,
          }}/>
        </div>
      </div>
      <ul className='movie-list-box'>
        {list.map((movie, i) => (
          <li key={i} onClick={()=>{}}>
            <MovieItem title={movie.title} poster={movie.poster_path}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchList
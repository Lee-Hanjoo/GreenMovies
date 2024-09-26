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
  const [sortObj, setSortObj] = useState({
    movieTv: 'movie',
    language: 'en',
    genre: '12',
  })
  
  let withOriginalLanguage = sortObj.language;
  // let sortBy = sortObj.sortBy;
  let withTextQuery = '해리';

  const movieBox = document.querySelector('.movie-list-box')
  const SearchList = document.querySelector('.search-list')
  const header = document.querySelector('.header')
  
  if(movieBox) {
      movieBox.addEventListener("scroll", () => {
        console.log(movieBox.scrollTop);
        if(movieBox.scrollTop > 96) {
          header.classList.add('hide');
          SearchList.classList.add('top');
        } else {
          header.classList.remove('hide');
          SearchList.classList.remove('top');
        }
    });
  }

  const getMovieTvData = async (genre, withOriginalLanguage, withTextQuery) => {

    let contType = myState;
    const res = await api.list(contType, genre, withOriginalLanguage, withTextQuery);
    
    setList(res)
    setLoading(false);
  }
  
  useEffect(() => {
    getMovieTvData(genre, withOriginalLanguage, withTextQuery)
  }, [])

  useEffect(() => {
    console.log(`sortObj`, sortObj)
  }, [sortObj])
  
  if (loading) {
    return <div>Loading...</div>
  }


  return (
    <div className='search-list wrap'>
      <div className={`search-list-top-wrap`}>
        <div className='top'>
          <div className='sort-box'>
            <Sort type={'movieTv'} list={['Movies','Tv Series']} setSortObj={setSortObj} sortObj={sortObj} />
            <Sort type={'language'} list={['en', 'fr', 'ko', 'ja', 'zh', 'th']} setSortObj={setSortObj} sortObj={sortObj} />
          </div>
          <Search />
        </div>
        <div className={`bottom ${bottomOpen ? 'on' : ''}`}>
          <button type='button' className='sort-flip-btn' onClick={()=>{setBottomOpen(!bottomOpen)}}></button>
            <Sort type={'genre'} multiple setSortObj={setSortObj} sortObj={sortObj} list={{
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
import React, { useEffect, useRef, useState } from 'react'
import MovieItem from '../component/MovieItem';
import Sort from '../component/Sort';
import Search from '../component/Search';
import store from '../state/store';
import { api } from '../api/tmdb';
import { useNavigate } from 'react-router-dom';

const SearchList = () => {
  
  let {myState, stateChange, list, setList} = store();
  const [loading, setLoading] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(false);
  const navigate = useNavigate();
  const searchInput = useRef('');
  let baseGenre = '';
  const [sortObj, setSortObj] = useState({
    movieTv: 'movie',
    language: 'en',
    genre: baseGenre,
    // sortBy: 'popularity.desc'
  })

  // 장르 리스트
  // 공통값
  const baseGenres = {
    'animation': 16,
    'action': 28,
    'comedy': 35,
    'crime': 80,
    'documentary': 99,
    'drama': 18,
    'family': 10751,
    'mystery': 9648,
    'western': 37,
  };

  const movieGenres = {
    'adventure': 12,
    'music': 10402,
    'fantasy': 14,
    'horror': 27,
    'history': 36,
    'romance': 10749,
    'sf': 878,
    'thriller': 53,
    'tv movie': 10770,
    'war': 10752,
  };

  const tvGenres = {
    'Action & Adventure': 10759,
    'Kids': 10762,
    'News': 10763,
    'Reality': 10764,
    'Sci-Fi & Fantasy': 10765,
    'Soap': 10766,
    'Talk': 10767,
    'War & Politics': 10768,
  };

  const getGenres = () => {
    if (sortObj.movieTv === 'movie') {
      return { ...baseGenres, ...movieGenres }; // movie일 때 기본값 + movie 장르
    } else {
      return { ...baseGenres, ...tvGenres };    // tv일 때 기본값 + tv 장르
    }
  };
  
  const genreList = getGenres();

  let withOriginalLanguage = sortObj.language;
  let sortBy = sortObj.sortBy;
  let withTextQuery = searchInput.current.value;

  const movieBox = document.querySelector('.movie-list-box')
  const SearchList = document.querySelector('.search-list')
  const header = document.querySelector('.header')
  
  if(movieBox) {
      movieBox.addEventListener("scroll", () => {
        if(movieBox.scrollTop > 96) {
          header.classList.add('hide');
          SearchList.classList.add('top');
        } else {
          header.classList.remove('hide');
          SearchList.classList.remove('top');
        }
    });
  }

  const getMovieTvData = async (myState, genre, withOriginalLanguage, withTextQuery, sortBy) => {

    let contType = sortObj.movieTv;
    const res = await api.list(contType, genre, withOriginalLanguage, withTextQuery, sortBy);
    
    setList(res)
    setLoading(false);
  }
  
  useEffect(() => {
    getMovieTvData(myState, sortObj.genre, withOriginalLanguage, withTextQuery, sortBy)
  }, [list])

  useEffect(() => {
    if(myState === 'movie'){
      baseGenre = '28'
    } else {
      baseGenre = '10759'
    }
  }, [sortObj, myState])
  
  if (loading) {
    return <div>Loading...</div>
  }


  return (
    <div className='search-list wrap'>
      <div className={`search-list-top-wrap`}>
        <div className='top'>
          <div className='sort-box'>
            <Sort type={'movieTv'} list={['Movies','Tv Series']} setSortObj={setSortObj} sortObj={sortObj} />
            {/* <Sort type={'by'} list={['new', ${}]} setSortObj={setSortObj} sortObj={sortObj} /> */}
            <Sort type={'language'} list={['en', 'fr', 'ko', 'ja', 'zh']} setSortObj={setSortObj} sortObj={sortObj} />
          </div>
          <Search searchInput={searchInput}/>
        </div>
        <div className={`bottom ${bottomOpen ? 'on' : ''}`}>
          <button type='button' className='sort-flip-btn' onClick={()=>{setBottomOpen(!bottomOpen)}}></button>
            <Sort type={'genre'} multiple setSortObj={setSortObj} sortObj={sortObj} list={
              genreList
            }/>
        </div>
      </div>
      <ul className='movie-list-box'>
        {list.map((movie, i) => (
          <li key={i} 
            onClick={()=>{
              navigate(`/detail/${movie.id}`);
              stateChange(sortObj.movieTv);
            }}
          >
            <MovieItem title={movie.title} poster={movie.poster_path}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchList
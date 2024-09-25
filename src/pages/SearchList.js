import React, { useEffect, useRef, useState } from 'react'
import MovieItem from '../component/MovieItem';
import Sort from '../component/Sort';
import Search from '../component/Search';
import store from '../state/store';
import { api } from '../api/tmdb';
import { useParams } from 'react-router-dom';

const SearchList = () => {

  let {myState, list, setList, genre} = store();
  const [loading, setLoading] = useState(false);


  const getMovieTvData = async (genre) => {

    let contType = myState;
    const res = await api.list(contType, genre);
    
    setList(res)
    setLoading(false);
  }
  
  useEffect(() => {
    getMovieTvData()
  }, [])

  
  if (loading) {
    return <div>Loading...</div>
  }

  console.log(myState, genre);

  return (
    <div className='search-list wrap'>
      <div className={`search-list-top-wrap`}>
        <div className='sort-wrap'>
          <Sort state list={['Movies','Tv Series']}/>
          <Sort genre chk list={{'action':28,'romance':10749,'comedy':35,'horror':27,'animation':16,'crime':80,'drama':18}}/>
        </div>
        <Search />
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
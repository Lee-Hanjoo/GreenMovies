import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import MovieItem from '../component/MovieItem';
import Rating from '../component/Rating';
import TextList from '../component/TextList';
import store from '../state/store';

const Home = () => {
  const {dataCtrl, main, myState} = store();
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [tab, setTab] = useState('trend');
  const [movies, setMovies] = useState([]);
  const bgUrl = 'https://image.tmdb.org/t/p/original/'
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await dataCtrl({t:'main'});  
    };
    if (main.movieTreding) {
      setLoading(false); // movies 배열이 채워지면 로딩 완료
      setMovies((myState === 'tv') ? main.tvTreding :  main.movieTreding)
    }
    fetchData();
  }, [main]);


  if (loading) {
    return <div>Loading...</div>; // 로딩 스피너나 메시지 표시
  }
  

  return (
    <div className='home wrap' style={{backgroundImage: `url(${bgUrl}${movies[0].backdrop_path})`}}>
      <Link to='/detail'>
        <button type='button' className='play-btn' />
      </Link>
      <div className='container'>
        <div className='movie-info-wrap'>
          <Rating movies={movies}/>
          <TextList lang={`${movies[0].original_language}`}>
            {movies[0].genre_ids.map((genre,i)=>(
              <li>{genre}</li>
            ))}
          </TextList>
          <h2 className='title'>{movies[0].title}</h2>
          <p className='desc'>{movies[0].overview}</p>
        </div>
        <div className='tab-wrap'>
          <ul className='tab'>
            <li className={`${tab === 'trend' ? 'on': ''}`} onClick={()=>{setTab('trend')}}>TRENDING</li>
            <li className={`${tab === 'top' ? 'on': ''}`} onClick={()=>{setTab('top')}}>TOP RATED</li>
          </ul>
          <div className='tab-cont'>
            {
              tab === 'trend' ?
                <Swiper 
                  navigation={true} 
                  modules={[Navigation]} 
                  slidesPerView={'auto'}
                  spaceBetween={25}
                  className={`swiper ${tab === 'trend' ? 'trend-list': ''}`}
                >
                  {movies.map((movie, i) => (
                    <SwiperSlide key={movie.id}>
                      <MovieItem title={movie.original_title} poster={movie.poster_path}/>
                    </SwiperSlide>
                  ))}
                </Swiper>
                :
                <></>
            }
            {
              tab === 'top' ?
                <Swiper 
                  navigation={true} 
                  modules={[Navigation]} 
                  slidesPerView={'auto'}
                  spaceBetween={25}
                  className={`swiper ${tab === 'top' ? 'top-list': ''}`}
                >
                  {movies.map((movie, i) => (
                    <SwiperSlide key={movie.id}>
                      <MovieItem title={movie.original_title} poster={movie.poster_path}/>
                    </SwiperSlide>
                  ))}
                </Swiper>
                :
                <></>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
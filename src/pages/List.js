import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import MovieItem from '../component/MovieItem';
import Rating from '../component/Rating';
import TextList from '../component/TextList';
import store from '../state/store';

import { api } from '../api/tmdb';

const List = ({tab, setTab}) => {
  const {dataCtrl, main, myState, setMain, storeMovieIdx, setStoreMovieIdx} = store();
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const bgUrl = 'https://image.tmdb.org/t/p/original/'

  // const [movieIdx, setMovieIdx] = useState(0)


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await dataCtrl({t:'main'});  
  //     console.log(res);
      
  //   };
  //   fetchData();
  // }, []);
  // useEffect(() => {
  //   if (main.movieTrending) {
  //     setLoading(false); // movies 배열이 채워지면 로딩 완료
  //     setMovies((myState === 'tv') ? main.tvTrending :  main.movieTrending)
  //   }
  // }, [main]);


  const getMovieTvData = async () => {
      const res = await api.all()

      setMain(res)
      
      setLoading(false); // movies 배열이 채워지면 로딩 완료
    
  }

  useEffect(() => {
    getMovieTvData()
  }, [])

  useEffect(()=>{

    if(!main) return;

    if(myState === 'tv') {
      // tv일때~ tv만을 위한 곳 tv의 트렌드 부터 시작
      if(tab === 'trend') {
        setMovies(main.tvTrending)
      } else {
        setMovies(main.tvToprated)
      }
    } else {
      // movie!! 
      if(tab === 'trend') {
        setMovies(main.movieTrending)
      } else {
        setMovies(main.movieToprated)
      }
    }
  },[myState, main, tab])

  const goToFirstSlide = () => {
    // 첫 번째 슬라이드로 이동
    if (swiperInstance) {
      swiperInstance.slideTo(0); // 인덱스 0: 첫 번째 슬라이드
    }
  };


  if (loading) {
    return <div>Loading...</div>
  }
  
  if(!movies?.length) return

  return (
    <div className='list wrap' style={{backgroundImage: `url(${bgUrl}${movies[storeMovieIdx].backdrop_path})`}}>
      <Link to={`/detail/${movies[storeMovieIdx].id}`}>
        <button type='button' className='play-btn' />
      </Link>
      <div className='container'>
        <div className='movie-info-wrap'>
          <Rating score={main?.movieTrending[storeMovieIdx]?.vote_average.toFixed(1)}/>
          <TextList lang={`${movies[storeMovieIdx].original_language}`}>
            {movies[storeMovieIdx].genre_ids.map((genre,i)=>(
              <li key={movies.id}>{genre}</li>
            ))}
          </TextList>
          <h2 className='title'>{movies[storeMovieIdx].title}</h2>
          <p className='desc'>{movies[storeMovieIdx].overview}</p>
        </div>
        <div className='tab-wrap'>
          <ul className='tab'>
            <li className={`${tab === 'trend' ? 'on': ''}`} 
              onClick={()=>{
                setTab('trend');
                setStoreMovieIdx(0);
                goToFirstSlide()
              }
            }
            >TRENDING</li>
            <li className={`${tab === 'top' ? 'on': ''}`}
              onClick={()=>{
                setTab('top');
                setStoreMovieIdx(0)
                goToFirstSlide()
              }
            }
            >TOP RATED</li>
          </ul>
          <div className='tab-cont'>
            <Swiper
              onSwiper={setSwiperInstance}
              initialSlide={storeMovieIdx}
              navigation={true} 
              modules={[Navigation]} 
              spaceBetween={25}
              onSlideChange={(v) => {
                setStoreMovieIdx(v.activeIndex)
              }}
              breakpoints={{
                479: {
                  slidesPerView: 3.5
                },
                767: {
                  slidesPerView: 4.5
                },
                1279: {
                  slidesPerView: 5.5
                }
              }}
              className={`swiper`}
            >
              {movies.map((movie, i) => (
                <SwiperSlide key={movie.id}>
                  <MovieItem title={myState === 'tv' ? movie.name : movie.title} poster={movie.poster_path}/>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}

export default List
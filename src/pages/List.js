import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import MovieItem from '../component/MovieItem';
import Rating from '../component/Rating';
import TextList from '../component/TextList';
import store from '../state/store';
import backdrop_nodata from '../imgs/backdrop_path_nodata.jpg'

import { api } from '../api/tmdb';

const List = ({tab, setTab}) => {
  const {dataCtrl, main, myState, setMain, storeMovieIdx, setStoreMovieIdx, cont, setCont} = store();
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [id, setId] = useState();
  const bgUrl = 'https://image.tmdb.org/t/p/original/'

  const getMovieTvData = async () => {
      const res = await api.all()

      setMain(res)
      setLoading(false); // movies 배열이 채워지면 로딩 완료
  }

  const getMovieDetail = async (id) => {
    
    let contType = myState;
    const res = await api.detail(contType, id);
    // const res = await api.detail(myState, id);
    setCont(res);
    setLoading(false); // 로딩 상태를 false로 설정
  };
  
  useEffect(() => {
    getMovieTvData()
  }, [])

  useEffect(() => {
    if (main) {
      if (myState === 'tv') {
        setMovies(tab === 'trend' ? main.tvTrending : main.tvToprated);
      } else {
        setMovies(tab === 'trend' ? main.movieTrending : main.movieToprated);
      }
    }
  }, [myState, main, tab]);

  useEffect(() => {
    if (Array.isArray(movies) && movies.length > 0 && storeMovieIdx >= 0 && storeMovieIdx < movies.length) {
      const id = movies[storeMovieIdx].id; // 현재 영화 ID 가져오기
      getMovieDetail(id); // ID를 인자로 전달
    }
  }, [movies, storeMovieIdx]);

  const goToFirstSlide = (idx) => {
    // 첫 번째 슬라이드로 이동
    if (swiperInstance) {
      swiperInstance.slideTo(idx); // 인덱스 0: 첫 번째 슬라이드
    }
  };

  useEffect(() => {
    goToFirstSlide()
    setStoreMovieIdx(0)
  }, [myState]);

  if (!Array.isArray(movies) || movies.length === 0) {
    return <div>Loading...</div>; // 또는 다른 로딩 표시
  }

  if(!movies?.length) return

  return (
    <div className='list wrap' 
      style={
        cont.backdrop_path ? 
          {backgroundImage: `url(${bgUrl}${cont.backdrop_path})`}
        :
          {backgroundImage: `url(${backdrop_nodata})`}
      }
    >
      <Link to={`/detail/${movies[storeMovieIdx].id}`}>
        <button type='button' className='play-btn' />
      </Link>
      <div className='container'>
        <div className='movie-info-wrap'>
          <Rating score={movies[storeMovieIdx].vote_average.toFixed(1)}/>
          <div className='genre-wrap'>
            <TextList lang={`${movies[storeMovieIdx].original_language}`}>
              {cont && cont.genres && cont.genres.length > 0 ? (
                cont.genres.slice(0, 3).map((genre, i) => (
                  <li key={i}>{genre.name}</li>
                ))
                ) : (
                  <li>No genres available</li>
                )
              }
            </TextList>
          </div>
          <h2 className='title'>
            {
              myState === 'tv' ? movies[storeMovieIdx].name : movies[storeMovieIdx].title
            }
          </h2>
          <p className='desc'>
            {
              movies[storeMovieIdx].overview !== "" ?
                movies[storeMovieIdx].overview
              :
                myState === 'tv' ? 
                'It is a program named ' + "'" + movies[storeMovieIdx].name + "', It is loved by many people and is one of the popular programs."
                  :
                  movies[storeMovieIdx].title
            }
          </p>
        </div>
        <div className='tab-wrap'>
          <ul className='tab'>
            <li className={`${tab === 'trend' ? 'on': ''}`} 
              onClick={()=>{
                setTab('trend');
                setStoreMovieIdx(0);
                goToFirstSlide(0)
              }
            }
            >TRENDING</li>
            <li className={`${tab === 'top' ? 'on': ''}`}
              onClick={()=>{
                setTab('top');
                setStoreMovieIdx(0)
                goToFirstSlide(0)
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
              slidesPerView={3.5}
              onSlideChange={(v) => {
                const newIndex = v.activeIndex;
                if (newIndex >= 0 && newIndex < movies.length) {
                  setStoreMovieIdx(newIndex);
                  setId(movies[newIndex].id); // ID 설정
                }
              }}
              breakpoints={{
                568: {
                  slidesPerView: 4.5
                },
                769: {
                  slidesPerView: 6.5
                },
                1121: {
                  slidesPerView: 3.5
                },
                1279: {
                  slidesPerView: 4.5
                }
              }}
              className={`swiper`}
            >
              {movies.map((movie, i) => (
                <SwiperSlide key={movie.id} 
                  onClick={()=>{
                    setStoreMovieIdx(i)
                    goToFirstSlide(i)
                  }}
                  >
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
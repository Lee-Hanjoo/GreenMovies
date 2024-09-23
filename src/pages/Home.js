import React, { useEffect, useState } from 'react'
import store from '../state/store'
import MovieItem from '../component/MovieItem';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { api } from '../api/tmdb';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const {main, setMain, setStoreMovieIdx, storeMovieIdx, stateChange} = store();
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  },[main])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='home wrap'>
      <div className='video'>
      </div>
      <div className='container'>
        <div className='cont-box'>
          <p className='title'>TRENDING MOVIES</p>
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
                slidesPerView: 5.5
              },
              1279: {
                slidesPerView: 7.5
              }
            }}
            className={`swiper`}
          >
            {main?.movieTrending?.map((movie, i) => 
              <SwiperSlide key={movie.id} 
                onClick={()=>{
                  navigate(`/detail/${movie.id}`);
                  stateChange('movie');
                }}
              >
                <MovieItem title={movie.title} poster={movie.poster_path}/>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
        <div className='cont-box'>
          <p className='title'>TOPRATED MOVIES</p>
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
                slidesPerView: 5.5
              },
              1279: {
                slidesPerView: 7.5
              }
            }}
            className={`swiper`}
          >
            {main?.movieToprated?.map((movie, i) => (
              <SwiperSlide key={movie.id} 
                onClick={()=>{
                  navigate(`/detail/${movie.id}`);
                  stateChange('movie');
                }}
              >
                <MovieItem title={movie.title} poster={movie.poster_path}/>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className='cont-box'>
          <p className='title'>TRENDING TV SERIES</p>
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
                slidesPerView: 5.5
              },
              1279: {
                slidesPerView: 7.5
              }
            }}
            className={`swiper`}
          >
            {main?.tvTrending?.map((tv, i) => (
              <SwiperSlide key={tv.id}
                onClick={()=>{
                  navigate(`/detail/${tv.id}`);
                  stateChange('tv');
                }}
              >
                <MovieItem title={tv.name} poster={tv.poster_path}/>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className='cont-box'>
          <p className='title'>TOPRATED TVSERIES</p>
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
                slidesPerView: 5.5
              },
              1279: {
                slidesPerView: 7.5
              }
            }}
            className={`swiper`}
          >
            {main?.tvToprated?.map((tv, i) => (
              <SwiperSlide key={tv.id}
                onClick={()=>{
                  navigate(`/detail/${tv.id}`);
                  stateChange('tv');
                }}
              >
                <MovieItem title={tv.name} poster={tv.poster_path}/>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default Home
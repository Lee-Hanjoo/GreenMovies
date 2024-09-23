import React, { useEffect, useState } from 'react'
import store from '../state/store'
import MovieItem from '../component/MovieItem';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { api } from '../api/tmdb';
import { useNavigate, useParams } from 'react-router-dom';

const Home = () => {

  const {main, setMain, setStoreMovieIdx, storeMovieIdx, stateChange, cont, setCont} = store();
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const youtubeUrl = 'https://www.youtube.com/embed/'
  
  const getMovieTvData = async () => {
    const res = await api.all()
    setMain(res)
    setLoading(false);
  }


  useEffect(() => {
    if (main?.movieTrending && main.movieTrending.length > 0) {
      const id = main.movieTrending[0].id; // id 가져오기
      getMovieDetail(id); // id를 인자로 전달
    }
  }, [main]);

  const getMovieDetail = async (id) => {
    const res = await api.detail('movie', id);
    setCont(res);
    setLoading(false); // 로딩 상태를 false로 설정
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(cont);
  const videoKey = cont.videos?.results?.[1]?.key;

  return (
    <div className='home wrap'>
      <div className='video'>
      {videoKey ? (
          <>
            <div className='video-txt'>
              <ul className='tag-list'>
                <li className='red'>TOP 1</li>
                <li className='purple'>BEST MOVIE</li>
                <li className='green'>MOST TRENDING</li>
              </ul>
              <p className='title'>{main.movieTrending[0].title}</p>
            </div>
            <iframe
              src={`${youtubeUrl}${videoKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoKey}`}
              title="video"
              allowFullScreen
              autoPlay='1'
              allow="autoplay"
              mute
            />
          </>
      ) : (
        <div>No Data</div>
      )
      }
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
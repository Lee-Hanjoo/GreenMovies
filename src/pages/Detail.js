import React, { useEffect, useState } from 'react'
import TextList from '../component/TextList';
import Rating from '../component/Rating';
import MovieItem from '../component/MovieItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Poster from '../component/Poster';
import store from '../state/store';
import { api } from '../api/tmdb';
import { useParams } from 'react-router-dom';

const Detail = () => {
  
  const { myState } = store();
  const [loading, setLoading] = useState(false);
  const [cont, setCont] = useState({});
  const {id} = useParams();
  const bgUrl = 'https://image.tmdb.org/t/p/original/'

  const getMovieTvData = async () => {

    let contType = myState;
    const res = await api.detail(contType, id);
    
    setCont(res)
    setLoading(false);
  }
  
  useEffect(() => {
    getMovieTvData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!cont || Object.keys(cont).length === 0) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  const hours = cont.runtime ? Math.floor(cont.runtime / 60) : 0;
  const minutes = cont.runtime ? cont.runtime % 60 : 0;

  console.log(cont);
  
  return (
    <div className='detail wrap' style={{backgroundImage: `url(${bgUrl}${cont.backdrop_path})`}}>
      <div className='container'>
        <div className='movie-info-wrap'>
          <div className='genre-wrap'>
          <TextList lang={`${cont.original_language}`}>
            {cont.genres.map((genre,i)=>(
              <li>{genre.name}</li>
            ))}
          </TextList>
          </div>
          <h2 className='title'>{cont.title}</h2>
          <TextList>
            <li>{cont.release_date}</li>
            <li>DIRECTOR: <span>{cont.casts.crew[0].name}</span></li>
            <li>{hours} H {minutes} M</li>
          </TextList>
          <p className='desc'>{cont.overview}</p>
          <div className='side-menu-wrap'>
            <Poster path={cont.poster_path}/>
            <Rating score={cont?.vote_average.toFixed(1)} />
          </div>
        </div>
        <div className='bottom-wrap'>
          <div className='cast-wrap'>
            <p className='label'>cast</p>
            <Swiper 
              navigation={true} 
              modules={[Navigation]} 
              spaceBetween={25}
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
              className={`swiper cast-list`}
            >
              {cont.casts.cast.map((cast, i) => (
                <SwiperSlide>
                  <MovieItem title={cast.name} poster={cast.profile_path}/>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className='trailer-wrap'>
            <p className='label'>trailer</p>
            <Swiper 
              navigation={true} 
              modules={[Navigation]} 
              slidesPerView={2.5}
              spaceBetween={25}
              className={`swiper trailer-list`}
            >
              {cont.videos.results.map((video, i) => (
                <SwiperSlide>
                  <MovieItem trailer title={video.name} poster={video.key}/>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail
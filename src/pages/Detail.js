import React from 'react'
import TextList from '../component/TextList';
import Rating from '../component/Rating';
import MovieItem from '../component/MovieItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Poster from '../component/Poster';

const Detail = ({movies}) => {

  return (
    <div className='detail wrap'>
      <div className='container'>
        <div className='movie-info-wrap'>
          <div className='genre-wrap'>
            <TextList lang='EN'>
              <li>Action</li>
              <li>Crime</li>
              <li>Thriller</li>
              <li>Comedy</li>
            </TextList>
          </div>
          <h2 className='title'>Bad Boys: Ride or Die</h2>
          <TextList>
            <li>2024</li>
            <li>DIRECTOR: <span>Adil El Arbi</span></li>
            <li>1 H 55 M</li>
          </TextList>
          <p className='desc'>After their late former Captain is framed, Lowrey and Burnett try to clear his name,
  only to end up on the run themselves.</p>
          <div className='side-menu-wrap'>
            <Poster />
            <Rating />
          </div>
        </div>
        <div className='bottom-wrap'>
          <div className='cast-wrap'>
            <p className='label'>cast</p>
            <Swiper 
              navigation={true} 
              modules={[Navigation]} 
              slidesPerView={'auto'}
              spaceBetween={25}
              className={`swiper cast-list`}
            >
              {movies.map((movie, i) => (
                <SwiperSlide key={movie.id}>
                  <MovieItem title={movie.original_title} poster={movie.poster_path}/>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className='trailer-wrap'>
            <p className='label'>trailer</p>
            <Swiper 
              slidesPerView={'auto'}
              spaceBetween={25}
              className={`swiper trailer-list`}
            >
              {movies.map((movie, i) => (
                <SwiperSlide key={movie.id}>
                  <MovieItem trailer title={movie.original_title} poster={movie.poster_path}/>
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
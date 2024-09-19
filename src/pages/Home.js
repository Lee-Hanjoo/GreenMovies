import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import MovieItem from '../component/MovieItem';
import Rating from '../component/Rating';
import TextList from '../component/TextList';

const Home = ({movies}) => {

  const [tab, setTab] = useState('trend');
  const bgUrl = 'https://image.tmdb.org/t/p/original/'

  return (
    <>
      {movies.map((movie, i) => (
        <div className='home wrap' style={{backgroundImage: `url(${bgUrl}${movie.backdrop_path})`}}>
          <Link to='/detail'>
            <button type='button' className='play-btn' />
          </Link>
          <div className='container'>
            <div className='movie-info-wrap'>
              <Rating movie={movie}/>
              {/* <TextList leng={movie.original_language}>
                {movies.map((movie, i) => (
                  <li>{movie.genre_ids}</li>
                ))}
              </TextList> */}
              <h2 className='title'>Bad Boys: Ride or Die</h2>
              <p className='desc'>After their late former Captain is framed, Lowrey and Burnett try to clear his name,
      only to end up on the run themselves.</p>
            </div>
            <div className='tab-wrap'>
              <ul className='tab'>
                <li className={`${tab === 'trend' ? 'on': ''}`} onClick={()=>{setTab('trend')}}>TRENDING</li>
                <li className={`${tab === 'top' ? 'on': ''}`} onClick={()=>{setTab('top')}}>TOP RATED</li>
              </ul>
              <div className='tab-cont'>
                {
                  tab &&
                    <Swiper 
                      navigation={true} 
                      modules={[Navigation]} 
                      slidesPerView={'auto'}
                      spaceBetween={25}
                      className={`swiper ${tab === 'trend' ? 'trend-list': 'top-list'}`}
                    >
                      {movies.map((movie, i) => (
                        <SwiperSlide key={movie.id}>
                          <MovieItem title={movie.original_title} poster={movie.poster_path}/>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                }
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Home
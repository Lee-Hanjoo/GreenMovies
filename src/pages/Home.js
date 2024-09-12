import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import MovieItem from '../component/MovieItem';
import Rating from '../component/Rating';
import TextList from '../component/TextList';

const Home = ({nav}) => {

  const [tab, setTab] = useState('trend')

  return (
    <div className='home wrap'>
      <Link to='/detail'>
        <button type='button' className='play-btn' />
      </Link>
      <div className='container'>
        <div className='movie-info-wrap'>
          <Rating />
          <TextList leng='EN'>
            <li>Action</li>
            <li>Crime</li>
            <li>Thriller</li>
            <li>Comedy</li>
          </TextList>
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
            <Swiper 
              navigation={true} 
              modules={[Navigation]} 
              slidesPerView={'auto'}
              spaceBetween={25}
              className={`swiper trend-list ${tab === 'trend' ? 'on': ''}`}
            >
              <SwiperSlide>
                <MovieItem />
              </SwiperSlide>
              <SwiperSlide>
                <MovieItem />
              </SwiperSlide>
              <SwiperSlide>
                <MovieItem />
              </SwiperSlide>
              <SwiperSlide>
                <MovieItem />
              </SwiperSlide>
              <SwiperSlide>
                <MovieItem />
              </SwiperSlide>
              <SwiperSlide>
                <MovieItem />
              </SwiperSlide>
            </Swiper>
            <Swiper 
              navigation={true} 
              modules={[Navigation]} 
              slidesPerView={'auto'}
              spaceBetween={25}
              className={`swiper top-list ${tab === 'top' ? 'on': ''}`}
            >
              <SwiperSlide>
                <MovieItem />
              </SwiperSlide>
              <SwiperSlide>
                <MovieItem />
              </SwiperSlide>
              <SwiperSlide>
                <MovieItem />
              </SwiperSlide>
              <SwiperSlide>
                <MovieItem />
              </SwiperSlide>
              <SwiperSlide>
                <MovieItem />
              </SwiperSlide>
              <SwiperSlide>
                <MovieItem />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom'
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Home = () => {

  const [tab, setTab] = useState('trend')

  return (
    <div className='home-wrap'>
      <Link to='/detail'>
        <button type='button' className='play-btn' />
      </Link>
      <div className='container'>
        <div className='movie-info-wrap'>
          <div className='genre-wrap'>
            <ul className='genre-list'>
              <li>Action</li>
              <li>Crime</li>
              <li>Thriller</li>
              <li>Comedy</li>
            </ul>
            <div className='leng'>EN</div>
          </div>
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
                <img src={`${process.env.PUBLIC_URL}/assets/imgs/movie_01.jpg`} alt='' />
                <p className='title'>Borderlands11</p>
              </SwiperSlide>
              <SwiperSlide>
                <img src={`${process.env.PUBLIC_URL}/assets/imgs/movie_01.jpg`} alt='' />
                <p className='title'>Borderlands11</p>
              </SwiperSlide>
              <SwiperSlide>
                <img src={`${process.env.PUBLIC_URL}/assets/imgs/movie_01.jpg`} alt='' />
                <p className='title'>Borderlands11</p>
              </SwiperSlide>
              <SwiperSlide>
                <img src={`${process.env.PUBLIC_URL}/assets/imgs/movie_01.jpg`} alt='' />
                <p className='title'>Borderlands11</p>
              </SwiperSlide>
              <SwiperSlide>
                <img src={`${process.env.PUBLIC_URL}/assets/imgs/movie_01.jpg`} alt='' />
                <p className='title'>Borderlands11</p>
              </SwiperSlide>
              <SwiperSlide>
                <img src={`${process.env.PUBLIC_URL}/assets/imgs/movie_01.jpg`} alt='' />
                <p className='title'>Borderlands11</p>
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
                <img src={`${process.env.PUBLIC_URL}/assets/imgs/movie_01.jpg`} alt='' />
                <p className='title'>Borderlands22</p>
              </SwiperSlide>
              <SwiperSlide>
                <img src={`${process.env.PUBLIC_URL}/assets/imgs/movie_01.jpg`} alt='' />
                <p className='title'>Borderlands22</p>
              </SwiperSlide>
              <SwiperSlide>
                <img src={`${process.env.PUBLIC_URL}/assets/imgs/movie_01.jpg`} alt='' />
                <p className='title'>Borderlands22</p>
              </SwiperSlide>
              <SwiperSlide>
                <img src={`${process.env.PUBLIC_URL}/assets/imgs/movie_01.jpg`} alt='' />
                <p className='title'>Borderlands22</p>
              </SwiperSlide>
              <SwiperSlide>
                <img src={`${process.env.PUBLIC_URL}/assets/imgs/movie_01.jpg`} alt='' />
                <p className='title'>Borderlands22</p>
              </SwiperSlide>
              <SwiperSlide>
                <img src={`${process.env.PUBLIC_URL}/assets/imgs/movie_01.jpg`} alt='' />
                <p className='title'>Borderlands22</p>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
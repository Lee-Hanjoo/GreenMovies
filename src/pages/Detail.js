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
import backdrop_nodata from '../imgs/backdrop_path_nodata.jpg'

const Detail = () => {
  
  const { myState, cont, setCont } = store();
  const [loading, setLoading] = useState(false);
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

  const hours = myState === 'movie' ? (cont.runtime && Math.floor(cont.runtime / 60)) : (cont.episode_run_time && Math.floor(cont.episode_run_time / 60))
  const minutes = myState === 'movie' ? (cont.runtime && cont.runtime % 60) : (cont.episode_run_time && cont.episode_run_time % 60)

  return (
    <div className='detail wrap' 
      style={
        cont.backdrop_path ? 
          {backgroundImage: `url(${bgUrl}${cont.backdrop_path})`}
        :
          {backgroundImage: `url(${backdrop_nodata})`}
      }
    >
      <div className='container'>
        <div className='movie-info-wrap'>
          <div className='genre-wrap'>
          <TextList lang={`${cont.original_language}`}>
            {cont.genres.slice(0, 5).map((genre,i)=>(
              <li key={i}>{genre.name}</li>
            ))}
          </TextList>
          </div>
          <h2 className={`title ${cont.homepage !== '' && 'pointer'}`} 
            onClick={()=>{
              cont.homepage !== '' && window.open(cont.homepage)
            }}
          >
            {myState === 'movie' && cont.title}
            {myState === 'tv' && cont.name}
          </h2>
          <TextList>
            {myState === 'tv' &&
              <>
                {/* <li className='networks-wrap'><img src={bgUrl + cont.networks[0].logo_path} onClick={()=>{window.open(cont.homepage)}} />{cont.networks[0].name}</li> */}
                {cont.networks && <li className='networks-wrap'><img src={bgUrl + cont.networks[0].logo_path} onClick={()=>{window.open(cont.homepage)}} /></li> }
                <li>{cont.first_air_date}{` ~ ` + cont.last_air_date}</li>
                {cont.created_by && cont.created_by.length > 0 && <li>CREATOR: <span>{cont.created_by[0].name}</span></li>}
                {cont.seasons && <li>SEASONS({cont.number_of_seasons})</li>}
              </>
            }
            {myState === 'movie' &&
              <>
                <li>{cont.release_date}</li>
                <li>DIRECTOR: <span>{cont.casts.crew[0].name}</span></li>
              </>
            }
            <li>{hours === 0 ? '' : hours + ` H`} {minutes === 0 ? '' : minutes + ` M`}</li>
          </TextList>
          <p className='desc'>{cont.overview}</p>
          <div className='side-menu-wrap'>
            <Poster path={cont.poster_path}/>
            <Rating score={cont?.vote_average.toFixed(1)} />
          </div>
        </div>
        <div className='bottom-wrap'>
          {
            myState === 'movie' && 
            <>
              {cont.casts.cast.length > 0 && 
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
                    {cont.casts.cast.slice(0, 10).map((cast, i) => (
                      <SwiperSlide key={i}>
                        <MovieItem title={cast.name} poster={cast.profile_path} />
                      </SwiperSlide>
                    ))
                    }
                  </Swiper>
                </div>
              }
            </>
          }
          {
            myState === 'tv' && cont.seasons &&
            <>
              <div className='season-wrap'>
                <p className='label'>season</p>
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
                  className={`swiper season-list`}
                >
                  {cont.seasons.map((season, i) => (
                    <SwiperSlide key={i}>
                      <MovieItem title={season.name} poster={season.poster_path}/>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </>
          }
          {
            cont.videos.results.length > 0 && 
            <div className='trailer-wrap'>
              <p className='label'>trailer</p>
              <Swiper 
                navigation={true} 
                modules={[Navigation]} 
                slidesPerView={2.5}
                spaceBetween={25}
                className={`swiper trailer-list`}
              >
                {cont.videos.results.slice(0, 5).map((video, i) => (
                  <SwiperSlide key={i}>
                    <MovieItem trailer title={video.name} poster={video.key} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Detail
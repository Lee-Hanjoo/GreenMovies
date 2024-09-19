import axios from 'axios';
import { create } from 'zustand';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params:{
    api_key:'f89a6c1f22aca3858a4ae7aef10de967',
  }
});

const store = create((set) => ({
  dataCtrl:async ()=>{

    // 하나씩 불러올 때
    const res = await instance.get('/movie/popular',{
      params:{
        query:'아바타',
        with_genres:10749,
        with_original_language:'ko',
        bgBaseURL: 'https://image.tmdb.org/t/p/original/',
      }
    });

    return res;

    // 여러개 불러올 때
    // Promise.all([instance.get('/movie/popular'), instance.get('/movie/top_rated'), instance.get('/tv/popular'), instance.get('/tv/top_rated')])
    // .then(function (results) {
    //   const moviePop = results[0];
    //   const movieTop = results[1];
    //   const tvPop = results[3];
    //   const tvTop = results[4];
    // });


       
  }
}))

export default store
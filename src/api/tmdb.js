import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params:{
    api_key:'f89a6c1f22aca3858a4ae7aef10de967',
  }
});

export const api = {
  all: async ()=>{
    let url = [
      instance.get('/movie/popular'), 
      instance.get('/movie/top_rated'), 
      instance.get('/tv/popular'), 
      instance.get('/tv/top_rated')
    ]
    let [movieTreding,movieToprated,tvTreding,tvToprated] = await Promise.all(url); 
    movieTreding = movieTreding.data.results;
    movieToprated = movieToprated.data.results;
    tvTreding = tvTreding.data.results;
    tvToprated = tvToprated.data.results;

    return {movieTreding,movieToprated,tvTreding,tvToprated};
  },
  list:async ()=>{
    const res = await instance.get('/discover/movie',{
      params:{
        with_genres:10749,
        with_original_language:'en',
        bgBaseURL: 'https://image.tmdb.org/t/p/original/',
      }
    });
    return res.data.results;
  },
  search:async (t,keyword)=>{
    return await instance.get(`/search/${t}`,{params:{query:keyword}});
  }
}
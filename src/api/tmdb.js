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
      instance.get('/tv/top_rated'),
    ]
    let [movieTrending,movieToprated,tvTrending,tvToprated] = await Promise.all(url); 
    movieTrending = movieTrending.data.results;
    movieToprated = movieToprated.data.results;
    tvTrending = tvTrending.data.results;
    tvToprated = tvToprated.data.results;

    return {movieTrending,movieToprated,tvTrending,tvToprated};
  },
  video:async ()=>{
    const res = await instance.get('/movie',{
      params:{
        movie_id:10749
      }
    });
    return res.data.results;
  },
  list:async ()=>{
    const res = await instance.get('/discover/movie',{
      params:{
        with_genres:10749,
        with_original_language:'en',
      }
    });
    return res.data.results;
  },
  search:async (t,keyword)=>{
    return await instance.get(`/search/${t}`,{params:{query:keyword}});
  }
}
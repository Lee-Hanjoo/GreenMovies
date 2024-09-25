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
  
  detail:async (t,id)=>{
    const res = await instance.get(`/${t}/${id}`, {
      params:{
        append_to_response: 'videos,images,casts'
      }
    });
    return res.data;
  },
  list:async (t,genre)=>{
    // 최신순	    release_date.desc
    // 인기순	    popularity.desc
    const res = await instance.get(`/discover/${t}`,{
      params:{
        with_genres: 28,
        with_original_language:'en',
        with_text_query:'',
        sort_by:'popularity.desc'
      }
    });
    return res.data.results;
  },
  search:async (t,keyword)=>{
    return await instance.get(`/search/${t}`,{params:{query:keyword}});
  }
}
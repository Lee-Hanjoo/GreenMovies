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
  list:async (t, genre, withOriginalLanguage, withTextQuery, sortBy)=>{
    // 최신순	    release_date.desc
    // 인기순	    popularity.desc
    const res = await instance.get(`/discover/${t}`,{
      params:{
        with_genres: genre,
        with_original_language: withOriginalLanguage,
        with_text_query: withTextQuery,
        sort_by: sortBy
      }
    });
    console.log(res.data.results)
    return res.data.results;
  },
  search:async (t,keyword)=>{
    return await instance.get(`/search/${t}`,{params:{query:keyword}});
  }
}
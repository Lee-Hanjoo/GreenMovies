
import { create } from 'zustand';
import { api } from '../api/tmdb';


const store = create((set) => ({
  main:{},
  list:[],
  cont:{},
  genre:28,
  myState : 'movie',
  stateChange:(s)=>{
    set({myState:s})
  },
  dataCtrl:async (a)=>{ 
    let res;
    switch(a.t){
      // case 'search':  break;
      case 'list' : res = await api.list(); set({list:res});
      break;

      //                   api통신 후 main에 그 통신한 res를 넣어준거임
      default : res = await api.all(); set({main:res});
    }
    
  },

  setMain: (newData) => set({ main: newData }),

  storeMovieIdx: 0,
  setStoreMovieIdx:(idx) => set({ storeMovieIdx: idx }),
  setCont: (newData) => set({ cont: newData }),

  setGenre: (newData) => set({ genre: newData }),
  setList: (newData) => set({ list: newData }),
}))

export default store
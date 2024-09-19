
import { create } from 'zustand';
import { api } from '../api/tmdb';


const store = create((set) => ({
  main:{},
  list:[],
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

      default : res = await api.all(); set({main:res});
    }
    
  }
}))

export default store
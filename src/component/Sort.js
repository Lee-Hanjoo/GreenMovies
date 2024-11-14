import React, { useEffect, useState } from 'react'
import store from '../state/store';

const Sort = (props) => {
  const { sortObj, setSortObj, type } = props
  const {stateChange, setGenre} = store();
  const [on, setOn] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(()=>{
    setSortObj({...sortObj, genre: ''})
    setSelectedItems([])
  },[sortObj.language])

  useEffect(()=>{
    setSortObj({...sortObj, language: 'en'})
    if(type === 'language') {
      setOn(0)
    }
  },[sortObj.movieTv])
  

  let item = Object.keys(props.list)
  let value = Object.values(props.list)

  const toggleItem = (item) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(item)) {
        // 이미 선택된 경우 선택 해제
        return prevSelected.filter((i) => i !== item);
      } else {
        // 선택되지 않은 경우 선택
        return [...prevSelected, item];
      }
    });
  };

  
  return (
    <ul className={`sort-list ${type !== 'movieTv' ? 'chk-type' : ''} ${type === 'language' ? 'icon' : ''} `}>
      {
        item.map((v,i)=>{
          return (
            <li key={i} 
            className={`${selectedItems.includes(item[i]) ? 'selected' : ''} ${type !== 'genre' && on === i ? 'on' : ''}`} 
            onClick={(e)=>{
                if(type === 'movieTv') {
                  setSortObj({...sortObj, [type]: value[i] === 'Movies' ? 'movie' : 'tv'})
                  stateChange(value[i] === 'Movies' ? 'movie' : 'tv')
                } else if(type === 'language') {
                  setSortObj({...sortObj, [type]: value[i]})
                } else if(type === 'genre') {
                  let genreArr = sortObj.genre.split(',');
                  if(genreArr.includes(String(value[i]))) {
                    genreArr = genreArr.filter((vv) => vv !== String(value[i]))
                  } else {
                    genreArr.push(value[i])
                  }
                  //                              genreArr[0]는 처음엔 ''이고, 누르면 genreArr[0]에 처음 누른 genre의 값이 들어감.
                  setSortObj({...sortObj, [type]: genreArr[0]===''?genreArr.join(''):genreArr.join(',')})
                  setGenre(value[i])
                // } else {
                //   setSortObj({...sortObj, [type]: value[i] === 'new' ? 'release_date.desc' : 'popularity.desc'})
                }
                setOn(i)
                { type === 'genre' && toggleItem(item[i]) }
              }}
            >{type === 'genre' ? v : value[i]}</li>
          )
        })
      }
    </ul>
  )
}

export default Sort
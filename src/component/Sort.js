import React, { useEffect, useState } from 'react'
import store from '../state/store';

const Sort = (props) => {
  const { sortObj, setSortObj, type } = props
  const {stateChange, setGenre} = store();

  let item = Object.keys(props.list)
  let value = Object.values(props.list)
  
  const [on, setOn] = useState(0)
  const [selectedItems, setSelectedItems] = useState([]);

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
              className={`${selectedItems.includes(item[i]) ? 'selected' : ''} ${on === i ? 'on' : ''}`} 
              onClick={()=>{
                if(type === 'movieTv') {
                  setSortObj({...sortObj, [type]: v === 'Movies' ? 'movie' : 'tv'})
                } else if(type === 'language') {
                  setSortObj({...sortObj, [type]: value[i]})
                } else {
                  let genreArr = sortObj.genre.split(',')
                  if(genreArr.includes(value[i])) {
                    genreArr = genreArr.filter((vv) => vv !== value[i])
                  } else {
                    genreArr.push(value[i])
                  }
                  setSortObj({...sortObj, [type]: genreArr.join(',')})
                }
                setOn(i)
                { props.multiple && toggleItem(item[i]) }
                { type === 'moveiTv' && stateChange(sortObj.movieTv)}
                { type === 'genre' && setGenre(value[i]) }
              }}
            >{type === 'genre' ? v : value[i]}</li>
          )
        })
      }
    </ul>
  )
}

export default Sort
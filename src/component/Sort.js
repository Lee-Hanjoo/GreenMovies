import React, { useEffect, useState } from 'react'
import store from '../state/store';

const Sort = (props) => {
  const {stateChange, setGenre} = store();

  let item = Object.keys(props.list)
  let value = Object.values(props.list)
  
  const [on, setOn] = useState(0)
  const [selectedItems, setSelectedItems] = useState([]);
  const items = ['','',''];

  const toggleItem = (item) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(item)) {
        // 이미 선택된 경우 선택 해제
        console.log(item);
        return prevSelected.filter((i) => i !== item);
      } else {
        // 선택되지 않은 경우 선택
        return [...prevSelected, item];
      }
    });
  };


  return (
    <ul className={`sort-list ${props.chk ? 'chk-type' : ''} ${props.icon ? 'icon' : ''}`}>
      {
        item.map((v,i)=>{
          return (
            <li key={i} 
              className={`${selectedItems.includes(item[i]) ? 'selected' : ''} ${on === i ? 'on' : ''}`} 
              onClick={()=>{
                setOn(i)
                { props.multiple && toggleItem(item[i]) }
                { props.state && i === 0 && stateChange('movie') }
                { props.state && i === 1 && stateChange('tv') }
                { props.genre && setGenre(value[i]) }
              }}
            >{props.genre ? v : value[i]}</li>
          )
        })
      }
    </ul>
  )
}

export default Sort
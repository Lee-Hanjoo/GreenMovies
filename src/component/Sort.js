import React, { useEffect, useState } from 'react'
import store from '../state/store';

const Sort = (props) => {
  const {stateChange, setGenre} = store();

  let item = Object.keys(props.list)
  let value = Object.values(props.list)
  
  const [on, setOn] = useState(0)

  return (
    <ul className={`sort-list ${props.chk ? 'chk-type' : ''}`}>
      {
        item.map((v,i)=>{
          return (
            <li key={i} className={`${on === i ? 'on' : ''}`} 
              onClick={()=>{
                setOn(i)
                { props.state && i === 0 && stateChange('movie') }
                { props.state && i === 1 && stateChange('tv') }
                { props.genre && setGenre(value[i]) }
              }}
            >{props.state ? value[i] : v}</li>
          )
        })
      }
    </ul>
  )
}

export default Sort
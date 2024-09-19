import React, { useState } from 'react'

const Sort = (props) => {
  const [on, setOn] = useState(0)
  return (
    <ul className={`sort-list ${props.chk ? 'chk-type' : ''}`}>
      {
        props.list.map((v,i)=>{
          return (
            <li key={i} className={`${on === i ? 'on' : ''}`} onClick={()=>{setOn(i)}}>{v}</li>
          )
        })
      }
    </ul>
  )
}

export default Sort
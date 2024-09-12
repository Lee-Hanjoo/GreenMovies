import React, { useState } from 'react'

const Sort = (props) => {
  const [on, setOn] = useState('action')
  return (
    <ul className={`sort-list ${props.chk ? 'chk-type' : ''}`}>
      <li className={`${on === 'action' ? 'on' : ''}`} onClick={()=>{setOn('action')}}>ACTION</li>
      <li className={`${on === 'romance' ? 'on' : ''}`} onClick={()=>{setOn('romance')}}>ROMANCE</li>
      <li className={`${on === 'comedy' ? 'on' : ''}`} onClick={()=>{setOn('comedy')}}>COMEDY</li>
    </ul>
  )
}

export default Sort
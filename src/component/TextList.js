import React from 'react'

const TextList = (props) => {

  return (
      <>
        <ul className='text-list'>
          {props.children}
          {
            props.lang ? 
            <li className='lang'>{props.lang}</li>
            :
            <></>
          }
        </ul>
      </>
  )
}

export default TextList
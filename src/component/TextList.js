import React from 'react'

const TextList = (props) => {

  return (
      <>
        <ul className='text-list'>
          {props.children}
          {
            props.leng ? 
            <li className='leng'>EN</li>
            :
            <></>
          }
        </ul>
      </>
  )
}

export default TextList
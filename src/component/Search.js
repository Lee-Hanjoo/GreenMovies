import {React, useRef, useState} from 'react'

const Search = () => {

  return (
    <div className={`search-box`}>
      <input type='text' className='search-input' placeholder='Search...'/>
      <button type='button' className='search-btn'/>
    </div>
  )
}

export default Search
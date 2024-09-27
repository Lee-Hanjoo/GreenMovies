import {React, useRef, useState} from 'react'

const Search = ({searchInput}) => {

  return (
    <div className={`search-box`}>
      <input type='text' className='search-input' placeholder='Search...' ref={searchInput}/>
      <button type='button' className='search-btn'/>
    </div>
  )
}

export default Search
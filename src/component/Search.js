import {React, useRef, useState} from 'react'

const Search = () => {

  const [search, setSearch] = useState(false);

  return (
    <div className={`search-box ${search ? 'on' : ''}`}>
      <input type='text' className='search-input' placeholder='Search...'/>
      <button type='button' className='search-btn' onClick={()=>{setSearch(true)}}/>
    </div>
  )
}

export default Search
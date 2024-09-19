import {React, useRef, useState} from 'react'

const Search = () => {

  const [search, setSearch] = useState(false);

  return (
    <div className={`search-box ${search ? 'on' : ''}`}>
      <input type='text' className='search-input'></input>
      <button type='button' className='search-btn' onClick={()=>{setSearch(!search)}}/>
    </div>
  )
}

export default Search
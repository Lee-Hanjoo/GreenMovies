import {React, useState} from 'react'

const Search = ({setSub}) => {

  const [search, setSearch] = useState(false)


  return (
    <div className={`search-box ${search ? 'on' : ''}`}>
      <input type='text' className='search-input'></input>
      <button type='button' className='search-btn' onClick={()=>{setSearch(true)}}/>
    </div>
  )
}

export default Search
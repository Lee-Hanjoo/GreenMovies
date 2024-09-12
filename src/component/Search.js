import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const Search = ({setSub}) => {

  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/list') {
      setSearch(false)
    }
  }, [ location ])

  const [search, setSearch] = useState(false)
  const navigate = useNavigate();
  const searchValue = useRef();

  const moveSearch = () => {
    navigate('/list')
  }

  return (
    <div className={`search-box ${search ? 'on' : ''}`}>
      <input type='text' className='search-input' ref={searchValue} onChange={()=>{setSub('search')}} onClick={moveSearch}></input>
      <button type='button' className='search-btn' onClick={()=>{setSearch(true)}} />
    </div>
  )
}

export default Search
import React, { Children, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

  const [search, setSearch] = useState(false)
  const searchValue = useRef()
  // if(!search) {
  //   searchValue.current.value = ''
  // }

  return (
    <header className='header'>
      <h1 className='logo'>LOGO</h1>
      <nav className='nav'>
        <button type='button' className='nav-btn' />
        <div>
          <Link className='home' to='/'>Home</Link>
          <Link className='movie' to='/'>Movies</Link>
          <Link className='tv' to='/'>TV Series</Link>
        </div>
      </nav>
      <div className={`search-wrap ${search ? 'on' : ''}`}>
        <input type='text' className='search-input' ref={searchValue}></input>
        <button type='button' className='search-btn' onClick={()=>{setSearch(!search)}} />
      </div>
    </header>
  )
}

export default Header
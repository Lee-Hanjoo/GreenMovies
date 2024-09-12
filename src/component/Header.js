import React, { Children, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Search from './Search'

const Header = ({setSub}) => {

  const [nav, setNav] = useState(false)
  const navigate = useNavigate();

  return (
    <header className='header'>
      <h1 className='logo' onClick={()=>{navigate('/')}}>LOGO</h1>
      <nav className={`nav ${nav ? 'on' : ''}`}>
        <button type='button' className='nav-btn' onClick={()=>{setNav(!nav)}}/>
        <div>
          <Link className='home' to='/' onClick={()=>{setSub('home')}}>Home</Link>
          <Link className='movie' to='/' onClick={()=>{setSub('movie')}}>Movies</Link>
          <Link className='tv' to='/' onClick={()=>{setSub('tv')}}>TV Series</Link>
        </div>
      </nav>
      <Search setSub={setSub} />
    </header>
  )
}

export default Header
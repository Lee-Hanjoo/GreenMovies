import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import store from '../state/store'

const Header = () => {

  const {stateChange} = store();
  const [nav, setNav] = useState(false)
  const navigate = useNavigate();

  return (
    <header className='header'>
      <h1 className='logo' onClick={()=>{navigate('/')}}>LOGO</h1>
      <nav className={`nav ${nav ? 'on' : ''}`}>
        <div className='dim' onClick={()=>{setNav(false)}}></div>
        <button type='button' className='nav-btn' onClick={()=>{setNav(!nav)}}/>
        <div className='nav-list'>
          <Link className='home' to='/' onClick={()=>{}}>Home</Link>
          <Link className='movie' to='/' onClick={()=>{stateChange('movie')}}>Movies</Link>
          <Link className='tv' to='/' onClick={()=>{stateChange('tv')}}>TV Series</Link>
        </div>
      </nav>
      <button type='button' className='list-btn' onClick={()=>{navigate('/list')}}></button>
    </header>
  )
}

export default Header
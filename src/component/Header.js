import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import store from '../state/store'

const Header = ({tab, setTab}) => {

  const { stateChange } = store();
  const [nav, setNav] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const [headerHidden, setHeaderHidden] = useState(false);

  const moveSearch = () => {
    if (location.pathname === '/search') {
      navigate(-1);
    } else {
      navigate('/search');
    }
  }

  window.addEventListener("scroll", ()=>{
    if(window.scrollY > 470) {
      setHeaderHidden(true);
    } else {
      setHeaderHidden(false)
    }
  })

  return (
    <header className={`header ${headerHidden ? 'hidden' : ''}`}>
      <h1 className='logo' onClick={()=>{navigate('/'); stateChange('movie')}}>CINEMA</h1>
      <nav className={`nav ${nav ? 'on' : ''}`}>
        <div className='dim' onClick={()=>{setNav(false)}}></div>
        <button type='button' className='nav-btn' onClick={()=>{setNav(!nav)}}/>
        <div className='nav-list'>
          <Link className='home' to='/' 
            onClick={()=>{
              stateChange('movie');
              setNav(false)}
            }
          >Home</Link>
          <Link className='movie' to='/list' 
            onClick={()=>{
              stateChange('movie');
              setNav(false)
              setTab('trend');
            }}
          >Movies</Link>
          <Link className='tv' to='/list' 
            onClick={()=>{
              stateChange('tv');
              setNav(false);
              setTab('trend');
            }}
          >TV Series</Link>
        </div>
      </nav>
      <button type='button' className='list-btn' onClick={()=>{moveSearch()}}></button>
    </header>
  )
}

export default Header
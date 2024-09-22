import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import store from '../state/store'

const Header = () => {

  const {stateChange} = store();
  const [nav, setNav] = useState(false)
  const [mainSort, setMainSort] = useState(true)
  const [cont, setCont] = useState('')
  const navigate = useNavigate();

  useEffect(()=>{
    if(!mainSort) {
      setCont('movie')
    } else {
      setCont('tv')
    }
  },[mainSort])

  return (
    <header className='header'>
      {/* <div className={`main-sort ${mainSort === 'movie' ? 'movie' : 'tv'}`}>
        <div className="switch">
				  <input type="checkbox" id="switch_input" />
				  <label for="switch_input" onClick={()=>{stateChange(cont); setMainSort(!mainSort)}}>
            {!mainSort ? 'Tv Series' : 'Movies'}
            <i></i>
          </label>
				</div>
      </div> */}
      <h1 className='logo' onClick={()=>{navigate('/'); stateChange('movie')}}>LOGO</h1>
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
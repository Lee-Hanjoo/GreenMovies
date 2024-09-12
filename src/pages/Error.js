import React from 'react'
import { useNavigate } from 'react-router-dom';

const Error = () => {

  const navigate = useNavigate();

  return (
    <div className='error wrap'>
      <div>
        <p className='error-msg'>
          404 Not Found
        </p>
        <button type="button" onClick={()=>{navigate('/')}}>
          Home
        </button>
      </div>
    </div>
  )
}

export default Error
import React from 'react'
import NotFoundImage from '../logo/404.gif'
import './NotFound.css'

function NotFound() {
  return (
    <div>
      <img className='notfoundimage' src={NotFoundImage} alt="No products found" />
    </div>
  )
}

export default NotFound

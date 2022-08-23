import React from 'react'
import profileImg from './images/profile-pic.png'

export default function MainListTile() {
  return (
    <div className='list-tile'>
        <img src={profileImg} alt="img" className='list-tile-img' />
        <p className='list-tile-name'>John Doe</p>
        <p className='list-tile-Udhari'>&#8377; 10</p>
    </div>
  )
}


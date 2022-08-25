import React from 'react'
import MainListTile from './MainListTile'
import Img from './images/profile-pic.png'

export default function MainList(props) {
  
  const MainListTileElement = props.allEntries.map((item) => {
    return (
      <MainListTile
      key = {item._id}
      img={Img}
      name={item.name}
      UdhariStatus = {item.udhari.status}
      UdhariAmount = {item.udhari.amount}
      managerHandler = {props.managerStatusHandler}
      />
    )
  })

  return (
    <div className='mainlist'>
    <input type="text" name="search" className='mainlist-search' placeholder='Search'/>
    <div className='mainlist-list'>
      {MainListTileElement}
    </div>
    </div>
  )
}

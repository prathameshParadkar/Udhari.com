import React from 'react'
import MainListTile from './MainListTile'


export default function MainList(props) {
  
  const MainListTileElement = props.allEntries.map((item) => {
    return (
      <MainListTile
      key = {item.entryId}
      img={item.entryImg}
      name={item.entryName}
      UdhariStatus = {item.udhari.entryStatus}
      UdhariAmount = {item.udhari.amount}
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

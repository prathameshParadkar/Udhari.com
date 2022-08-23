import React from 'react'
import MainListTile from './MainListTile'

export default function MainList() {
  return (
    <div className='mainlist'>
    <input type="text" name="search" className='mainlist-search' placeholder='Search'/>
    <div className='mainlist-list'>
      <MainListTile />
      <MainListTile />
      <MainListTile />
      <MainListTile />
      <MainListTile />
      <MainListTile />
      <MainListTile />
      <MainListTile />
      <MainListTile />
      <MainListTile />
      <MainListTile />
      <MainListTile />
      <MainListTile />
      <MainListTile />
      <MainListTile />
    </div>
    </div>
  )
}

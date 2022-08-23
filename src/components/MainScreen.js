import React from 'react'
import MainList from './MainList'
import Navbar from './Navbar'
import Workspace from './Workspace'

export default function MainScreen() {
  return (
    <div className='mainscreen-container'>
    <Navbar />
    <MainList />
    <Workspace />
    </div>
  )
}

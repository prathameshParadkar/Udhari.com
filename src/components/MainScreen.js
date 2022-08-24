import React from 'react'
import MainList from './MainList'
import Navbar from './Navbar'
import Workspace from './Workspace'
import Data from './Data.js'


export default function MainScreen() {
  const [isManagerOn, setIsManagerOn] = React.useState(false)

  return (
    <div className='mainscreen-container'>
    <Navbar />
    
    {/* // Data[0] represent the data of the user logged in. Data[1] will be another user */}
    {/* entry prop here is all entries of user at Data[0] */}
    <MainList allEntries = {Data[0].entries} />
    
    <Workspace isManagerOn={isManagerOn} />
    </div>
  )
}

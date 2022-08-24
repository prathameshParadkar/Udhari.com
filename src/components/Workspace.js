import React from 'react'
import AddUdhariWS from './Workspace Components/AddUdhariWS'
import ManageUdhariWS from './Workspace Components/ManageUdhariWS';

export default function Workspace() {
  const [isAdded, setIsAdded] = React.useState(true);
  const [isManagerOn, setIsManagerOn] = React.useState(false)
  
  function toAddUdhariWS(){
    setIsAdded(prev => !prev)
  }
  function toManageUdhariWS(){
    setIsManagerOn(prev => !prev)
  }

  return (
    <>
    <div className='workspace'>
      <button className='workspace-addUdhari' onClick={toAddUdhariWS}>Add Udhari</button>
      <div className='workspace-box'>
      {isAdded && !isManagerOn && <p>Workspace</p>}
      {!isAdded && <AddUdhariWS addStatusHandler = {toAddUdhariWS} />}
      {isManagerOn && <ManageUdhariWS />}
      </div>
    </div>
    </>
  )
}
import React from 'react'
import AddUdhariWS from './Workspace Components/AddUdhariWS'
import ManageUdhariWS from './Workspace Components/ManageUdhariWS';

export default function Workspace(props) {
  const [isAdded, setIsAdded] = React.useState(true);

  function toAddUdhariWS(){
    setIsAdded(prev => !prev)
  }
  function toManageUdhariWS(){
    props.managerStatusHandler()
  }
// console.log(isManagerOn)
  return (
    <>
    <div className='workspace'>
      <button className='workspace-addUdhari' onClick={toAddUdhariWS}>Add Udhari</button>
      <div className='workspace-box'>
      {isAdded && !props.managerStatus && <p>Workspace</p>}
      {!isAdded && <AddUdhariWS addStatusHandler = {toAddUdhariWS} username={props.username} updateEntry={props.updateEntry}/>}
      {props.managerStatus &&  <ManageUdhariWS managerStatusHandler={toManageUdhariWS} />}
     
      </div>
    </div>
    </>
  )
}
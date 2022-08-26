import React from 'react'
import AddUdhariWS from './Workspace Components/AddUdhariWS'
import ManageUdhariWS from './Workspace Components/ManageUdhariWS';
import Img from './images/profile-pic.png'

export default function Workspace(props) {
  const [isAdded, setIsAdded] = React.useState(true);
  
  function toAddUdhariWS(){
    setIsAdded(prev => !prev)
  }
  function toManageUdhariWS(){
    props.managerStatusHandler()
  }

  return (
    <>
    <div className='workspace'>
      <button className='workspace-addUdhari' onClick={toAddUdhariWS}>Add Udhari</button>
      <div className='workspace-box'>
      {isAdded && !props.managerStatus && <p>Workspace</p>}
      {!isAdded && <AddUdhariWS addStatusHandler = {toAddUdhariWS} username={props.username} updateEntry={props.updateEntry}/>}
      {props.entries && props.entries.length > 0 && props.managerStatus && props.entries.map((item) => {
              return (
                <ManageUdhariWS 
                key = {item._id}
                img={Img}
                name={item.name}
                upi_id = {item.upi_id}
                UdhariStatus = {item.udhari.status}
                UdhariAmount = {item.udhari.amount}
                contact = {item.personalDetails.contact}
                email = {item.personalDetails.email}
                managerStatusHandler={toManageUdhariWS} />
              )
            })}
      </div>
    </div>
    </>
  )
}
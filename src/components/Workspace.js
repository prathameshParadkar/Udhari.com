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
      {!isAdded && !props.managerStatus && <AddUdhariWS addStatusHandler = {toAddUdhariWS} username={props.username} updateEntry={props.updateEntry}/>}
      { props.entries && props.entries.length > 0 && props.managerStatus && props.entries.map((item) => {
              let isActiveDiv;
              isActiveDiv = (item._id === props.activeDiv) ? true : false; 
              return (
                <>
                { isActiveDiv && 
                (<ManageUdhariWS 
                key = {item._id}
                name={item.name}
                
                img={Img}
                upi_id = {item.upi_id}
                UdhariStatus = {item.udhari.status}
                UdhariAmount = {item.udhari.amount}
                contact = {item.personalDetails.contact}
                email = {item.personalDetails.email}
                managerStatusHandler={toManageUdhariWS}
                
                username={props.username}
                removeEntry ={props.removeEntry}
                updateEntry={props.updateEntry}
                manageEntry={props.manageEntry}
                removeUdhariKey = {item.entryId + "key"}
                />)}
                </>
              )
            }
            )
          }
      </div>
    </div>
    </>
  )
}
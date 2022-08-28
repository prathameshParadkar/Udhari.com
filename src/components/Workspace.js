import React from 'react'
import AddUdhariWS from './Workspace Components/AddUdhariWS'
import ManageUdhariWS from './Workspace Components/ManageUdhariWS';
import Img from './images/profile-pic.png'
import Data from './Data'

export default function Workspace(props) {
  const [isSlidOut, setIsSlidOut] = React.useState(true);

  function toResponsiveMainScreen(){
    setIsSlidOut(prevSate => !prevSate)
    setTimeout(()=>{
      props.responsiveMainListHandler(true)
      props.responsiveWorkspaceHandler(false)
    }, 250)
  }

  function toAddUdhariWS(){
    props.isAddedHandler(prev => !prev)
  }
  function toManageUdhariWS(){
    props.managerStatusHandler()
  }

  return (
    <>
    <div className={`workspace ${!isSlidOut ? 'workspace-slide-out' : 'workspace-slide-in'}`}>
      <div className='workspace-addUdhari-box'>
      {!props.isResponsive && <button className='workspace-addUdhari' onClick={toAddUdhariWS}>Add Udhari</button>}
      </div>
      <div className='workspace-box'>
      {props.isAdded && !props.managerStatus && <p>Workspace</p>}
      {!props.isAdded && !props.managerStatus && 
      <AddUdhariWS 
      addStatusHandler = {toAddUdhariWS} 
      username={props.username} 
      updateEntry={props.updateEntry}
      
      responsiveWorkspaceHandler = {props.responsiveWorkspaceHandler}
      responsiveMainListHandler = {props.responsiveMainListHandler}
      toResponsiveMainScreen = {toResponsiveMainScreen}
      isResponsive = {props.isResponsive}
      
      
      />}
      {props.entries && props.entries.length > 0 && props.managerStatus && props.entries.map((item) => {
              let isActiveDiv;
              isActiveDiv = (item.entryId === props.activeDiv) ? true : false; 
              
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
                removeUdhariKey = {item.entryId + "key"}
                
                divCloseHandler = {props.divCloseHandler}
                responsiveWorkspaceHandler = {props.responsiveWorkspaceHandler}
                responsiveMainListHandler = {props.responsiveMainListHandler}
                toResponsiveMainScreen = {toResponsiveMainScreen}
                isResponsive = {props.isResponsive}
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
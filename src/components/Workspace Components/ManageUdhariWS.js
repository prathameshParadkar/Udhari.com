import React, { useState, useEffect } from 'react'
import AmountChangeWS from './AmountChangeWS'
import profileImg from './profile-pic.png' 
import Axios from "axios";

export default function ManageUdhariWS(props) {
  function MoneyReceived(){
    //pending
  }
  function MoneyPayed(){
    //pending
  }
  function UdhariClose(){
    props.managerStatusHandler()
  }
  return (
    <>
    <button className='add-Udhari-close' onClick={UdhariClose}>&#xd7;</button>
    <div className='manage-Udhari-box'>

      <div className='manage-Udhari-img-name'>
      <img src={profileImg} alt="" className='manage-Udhari-img' />
      <p className='manage-Udhari-name'>{props.name}</p>
      </div>

      <div className='manage-Udhari-status'>
        {props.UdhariStatus === "Udhari_to_get" ? <p className='manage-Udhari-status-msg'>Money to be received from</p> : <p className='manage-Udhari-status-msg'>Money to pay to</p>}
        <p className='manage-Udhari-tag'>&#8377;{props.UdhariAmount}</p>
      </div>

      <div className='manage-Udhari-personal-details-box'>
        <h3 className='manage-Udhari-personal-details'>Personal Details</h3>
        {/* <hr className='manage-Udhari-hr' /> */}
        <div>
          <p>Contact</p>
          <p>{props.contact}</p>
        </div>

        <div>
          <p>Email</p>
          <p>{props.email}</p>
        </div>

        <div>
          <p>UPI id</p>
          <p>{props.upi_id}</p>
        </div>
  
      </div>

      <div className='manage-Udhari-section'>
        <h3 className='manage-Udhari-personal-details'>Udhari</h3>
      <AmountChangeWS receiveHandler={MoneyReceived} payedHandler={MoneyPayed} />
      </div>
      
    </div>
    </>
  )
}
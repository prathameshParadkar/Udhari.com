import React, { useState, useEffect } from 'react'
import AmountChangeWS from './AmountChangeWS'
import profileImg from './profile-pic.png' 
import Axios from "axios";

export default function ManageUdhariWS(props) {
  const [amount, setAmount] = useState(0);
  // const [status, setStatus] = useState("");
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [upi_id, setUpi_id] = useState("");

  //Connecting through Data.js/Database pending.
  // useEffect(() => {
  //   Axios.get(`http://localhost:3001/${username}`)
  //   .then(res => {
  //       if(res.data){
  //           // alert("user found");
  //           // console.log(res.data);
  //           const {username, upi_id, contact, email} = res.data;
  //           console.log({username, upi_id, contact, email});
  //           setContact(contact);
  //           setEmail(email);
  //           setUpi_id(upi_id);
  //       }
  //   })
  //   .catch(e => {
  //       console.log(e);
  //   })
  // })
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
      <p className='manage-Udhari-name'>Shoe momo</p>
      </div>

      <div className='manage-Udhari-status'>
        <p className='manage-Udhari-status-msg'>Money to be received from</p>
        <p className='manage-Udhari-tag'>&#8377;10</p>
      </div>

      <div className='manage-Udhari-personal-details-box'>
        <h3 className='manage-Udhari-personal-details'>Personal Details</h3>
        {/* <hr className='manage-Udhari-hr' /> */}
        <div>
          <p>Contact</p>
          <p>-</p>
        </div>

        <div>
          <p>Email</p>
          <p>-</p>
        </div>

        <div>
          <p>UPI id</p>
          <p>-</p>
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
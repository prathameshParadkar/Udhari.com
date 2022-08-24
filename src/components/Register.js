import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Navigate} from "react-router";
import Axios from 'axios';

export default function Register(props) {
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [upi_id, setUpi_id] = useState("");
  const [password, setPassword] = useState("");
  const [redirectTo, setredirectTo] = useState(null);
  const [errors, setErrors] = useState("")
  function registerUser(e){
    e.preventDefault()
      Axios.post("http://localhost:3001/register", {username, contact, email, upi_id, password})
      .then(res => {
        if(typeof res.data === 'object' && res.data !== null){
          props.updateUser({
            isLoggedIn: true,
            username: res.data.username
          })
          setredirectTo("/home");
        }else {
          alert(res.data);
        }
      })
      .catch(error => {
        console.log(error.response.data);
        alert(error.response.data);
        setErrors(error.response.data);
      })
  }
  
  if(redirectTo){
    return <Navigate to={{ pathname: redirectTo }} />
  }else {
  return (
      <>
      <aside>
          <div className='login-box'>

            <h2 className='login-heading'>Udhari<span>.com</span></h2>
              <div className='login-email'>
                <label htmlFor="login-email">Username</label>
                <input type="text" name='login-email' onChange={e => {setUsername(e.target.value)}} required />
              </div>
              <div className='login-email'>
                <label htmlFor="login-email">E-mail</label>
                <input type="text" name='login-email' onChange={e => {setEmail(e.target.value)}}required />
              </div>
              <div className='login-email'>
                <label htmlFor="login-email">Contact</label>
                <input type="text" name='login-email' onChange={e => {setContact(e.target.value)}}required />
              </div>
              <div className='login-email'>
                <label htmlFor="login-email">UPI Id</label>
                <input type="text" name='login-email' onChange={e => {setUpi_id(e.target.value)}}required />
              </div>
              <div className='login-password'>
                <label htmlFor="login-password">Password</label>
                <input type="password" name='login-password'onChange={e => {setPassword(e.target.value)}} required />
              </div>
              <input type="submit" id='login-button' onClick={registerUser} value="Register"/>
              <Link to="/">Already a User? Login!</Link>
          </div>
      </aside>
    </>
  )
  }
}
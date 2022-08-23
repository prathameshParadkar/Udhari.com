import React from 'react';
import {Link} from "react-router-dom";

export default function Register() {
  const [isLogin, setIsLogin] = React.useState(true);
  
  function registerButton(){
    setIsLogin(isLogin ? false : true);
    setTimeout(() => {
      alert("You registered successfully!")
    },250)
  }
  
  return (
      <>
      <aside>
          <div className='login-box'>

            <h2 className='login-heading'>Udhari<span>.com</span></h2>
              <div className='login-email'>
                <label htmlFor="login-email">E-mail</label>
                <input type="text" name='login-email' required />
              </div>
              <div className='login-password'>
                <label htmlFor="login-password">Password</label>
                <input type="password" name='login-password' required />
              </div>
              <input type="submit" id='login-button' onClick={registerButton} value="Register"/>
              <Link className='login-link'  to="/">Already a User? Login!</Link>
          </div>
      </aside>
    </>
  )
}
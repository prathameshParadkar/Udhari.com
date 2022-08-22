import React from 'react'
import Register from './Register';

export default function Login() {
  const [isLogin, setIsLogin] = React.useState(true);
  const [isRegister, setIsRegister] = React.useState(false);
  
  function loginButton(){
    setIsLogin(isLogin ? false : true);
    setTimeout(() => {
      alert("You logged in successfully!")
    },250)
  }
  function toRegisterComponent(){
    setIsLogin(isLogin ? false : true);
    setIsRegister(isRegister ? false : true);
  }

  return (
    <>
    {isLogin && (
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
              <input type="submit" id='login-button' onClick={loginButton} value="Sign in"/>
              <p onClick={toRegisterComponent}>Not yet Registered?</p>

          </div>
      </aside>
      )
    }
    {isRegister && <Register />}
    </>
  )
}
import React from 'react'

export default function Navbar(props) {
  const [isSlidOut, setIsSlidOut] = React.useState(true)
  function toResponsiveMainScreen(){
    setIsSlidOut(prevSate => !prevSate)
    setTimeout(()=>{
      props.responsiveMainListHandler(true)
      props.responsiveNavbarHandler(false)
    }, 250)
  }

  return (
    <nav className={!isSlidOut ? 'nav-slide-out' : 'nav-slide-in'}>
      {props.isResponsiveNavbarOn && <span onClick={toResponsiveMainScreen} className="material-symbols-outlined nav-arrow-button">chevron_left</span>}
      <h2 className="nav-heading">Udhari<span>.com</span></h2>
      {props.isLoggedIn &&
          <p>Welcome, {props.username}!</p>
        }
    </nav>

  )
}
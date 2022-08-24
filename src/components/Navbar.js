import React from 'react'

export default function Navbar(props) {
  return (
    <nav>
      <h2 className="nav-heading">Udhari<span>.com</span></h2>
      {props.isLoggedIn &&
          <p>Welcome, {props.username}!</p>
        }
      </nav>

  )
}
import React from 'react'

export default function Navbar(props) {
  return (
    <div>
      Navbar
      {props.isLoggedIn &&
          <p>Welcome, {props.username}!</p>
        }
    </div>

  )
}

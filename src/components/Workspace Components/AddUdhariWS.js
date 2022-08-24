import React from 'react'
import profileImg from './profile-pic.png'

export default function AddUdhariWS(props) {
    const [UdhariAmount, setUdhariAmount] = React.useState(0);
    const [UdhariStatus, setUdhariStatus] = React.useState("");
    const MoneyReceived = (e) => {
        e.preventDefault()
        setUdhariStatus("Udhari_to_pay")
        setUdhariAmount(prompt("Enter amount received by you."))
        props.addStatusHandler(prevState => !prevState)
    }
    const MoneyPayed = (e) => {
        e.preventDefault()
        setUdhariStatus("Udhari_to_get")
        setUdhariAmount(prompt("Enter amount payed to you."))
        props.addStatusHandler(prevState => !prevState)
    }

  return (
    <div className='add-Udhari-box'>
        <img className='add-Udhari-img' src={profileImg} alt="" />
        
        <form className='add-Udhari-form' action="/ManageUdhariWS">
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Name   </label>
            <input type="text" className="form-control" id="exampleFormControlInput1" required />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">Contact</label>
            <input type="tel" className="form-control" id="exampleFormControlInput2"  />
        </div>  
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput3" className="form-label">Email  </label>
            <input type="email" className="form-control" id="exampleFormControlInput3"  />
        </div>
          <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Address </label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput4" className="form-label">UPI id </label>
                <input type="text" className="form-control" id="exampleFormControlInput4"  />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput5" className="form-label">Image  </label>
                <input type="text" className="form-control" id="exampleFormControlInput5"  />
            </div>
            <div>
            <button value="UdhariReceived" onClick={MoneyReceived}> Money received</button>
            <button value="UdhariPayed" onClick={MoneyPayed}> Money Payed</button>
            </div>
        </form>
    </div>
  )
}

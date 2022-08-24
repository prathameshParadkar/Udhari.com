import React, {useState} from 'react'
import profileImg from './profile-pic.png'
import Axios from 'axios';

export default function AddUdhariWS(props) {
    const [amount, setAmount] = useState(0);
    const [status, setStatus] = useState("");
    const [username, setUsername] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [upi_id, setUpi_id] = useState("");

    const MoneyReceived = (e) => {
        e.preventDefault()
        setStatus("Udhari_to_pay");
        props.addStatusHandler(prevState => !prevState)
            Axios.put(`http://localhost:3001/${props.username}/udhari_to_pay`, {username, contact, email, upi_id, amount})
                .then(res => {     
                    console.log(res.data);
                    if(res.data === "Added to db"){
                    props.updateEntry({name: username, upi_id: upi_id, 
                        personalDetails: {contact: contact, email: email}, 
                        udhari: {status: "Udhari_to_pay", amount: amount}})
                    }
                    else {
                        alert(`Error: ${res.data}`);
                    }
                })
                .catch(e => {
                    console.log(e);
                })
        
    }

    const MoneyPayed = (e) => {
        e.preventDefault()
        setStatus("Udhari_to_get")
        props.addStatusHandler(prevState => !prevState)

            Axios.put(`http://localhost:3001/${props.username}/udhari_to_get`, {username, contact, email, upi_id, amount})
            .then(res => {
                console.log(res.data);
                if(res.data === "Added to db"){
                props.updateEntry({name: username, upi_id: upi_id, 
                    personalDetails: {contact: contact, email: email}, 
                    udhari: {status: "Udhari_to_get", amount: amount}})
                }
                else {
                    alert(`Error: ${res.data}`);
                }
            })
            .catch(e => {
                console.log(e);
            })

    }

  return (
    <div className='add-Udhari-box'>
        <img className='add-Udhari-img' src={profileImg} alt="" />
        <form className='add-Udhari-form' action="/ManageUdhariWS">
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Name   </label>
            <input type="text" className="form-control" id="exampleFormControlInput1" onChange={e => {setUsername(e.target.value)}} required />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">Contact</label>
            <input type="tel" className="form-control" id="exampleFormControlInput2"  onChange={e => {setContact(e.target.value)}} />
        </div>  
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput3" className="form-label">Email  </label>
            <input type="email" className="form-control" id="exampleFormControlInput3" onChange={e => {setEmail(e.target.value)}} />
        </div>
          <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Address </label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput4" className="form-label">UPI id </label>
                <input type="text" className="form-control" id="exampleFormControlInput4" onChange={e => {setUpi_id(e.target.value)}} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput5" className="form-label">Amount  </label>
                <input type="text" className="form-control" id="exampleFormControlInput5"  onChange={e => {setAmount(e.target.value)}}/>
            </div>
            <div>
            <button value="UdhariReceived" onClick={MoneyReceived}> Money received</button>
            <button value="UdhariPayed" onClick={MoneyPayed}> Money Payed</button>
            </div>
        </form>
    </div>
  )
}

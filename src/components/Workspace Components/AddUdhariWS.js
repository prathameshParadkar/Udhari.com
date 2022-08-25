import React, {useEffect, useState} from 'react'
import profileImg from './profile-pic.png'
import Axios from 'axios';
import AmountChangeWS from './AmountChangeWS';

export default function AddUdhariWS(props) {
    const [amount, setAmount] = useState(0);
    // const [status, setStatus] = useState("");
    const [username, setUsername] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [upi_id, setUpi_id] = useState("");

    const updateAmount = (newAmount) => {
        setAmount(newAmount);
    }

    const MoneyReceived = (e) => {
        e.preventDefault()
        // setStatus("Udhari_to_pay");
        props.addStatusHandler(prevState => !prevState)
            Axios.put(`http://localhost:3001/${props.username}/udhari_to_pay`, {username, contact, email, upi_id, amount})
                .then(res => {     
                    if(typeof res.data === 'object' && res.data !== null){
                        const {status, amount} = res.data[0].udhari;
                        const {name, upi_id, _id} = res.data[0];
                        const {contact, email} = res.data[0].personalDetails;
                        props.updateEntry({_id, name, upi_id, personalDetails: {email, contact}, udhari: {status, amount}});
                        // console.log({_id, name, upi_id, personalDetails: {email, contact}, udhari: {status, amount}})
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
        // setStatus("Udhari_to_get")
        props.addStatusHandler(prevState => !prevState)
            Axios.put(`http://localhost:3001/${props.username}/udhari_to_get`, {username, contact, email, upi_id, amount})
            .then(res => {
                if(typeof res.data === 'object' && res.data !== null){
                        const {status, amount} = res.data[0].udhari;
                        const {name, upi_id, _id} = res.data[0];
                        const {contact, email} = res.data[0].personalDetails;
                        props.updateEntry({_id, name, upi_id, personalDetails: {email, contact}, udhari: {status, amount}});
                }
                else {
                    alert(`Error: ${res.data}`);
                }
            })
            .catch(e => {
                console.log(e);
            })

    }

    function UdhariClose(){
        props.addStatusHandler()
    }

    const findUser = (username) => {
        Axios.get(`http://localhost:3001/${username}`)
            .then(res => {
                if(res.data){
                    // alert("user found");
                    // console.log(res.data);
                    const {username, upi_id, contact, email} = res.data;
                    console.log({username, upi_id, contact, email});
                    setContact(contact);
                    setEmail(email);
                    setUpi_id(upi_id);
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if(username){
                // alert("calling function");
            findUser(username);
        }}, 1000);
        return () => clearTimeout(timeOutId);
    }, [username])

    

    return (
        <>
        <button className='add-Udhari-close' onClick={UdhariClose}>&#xd7;</button>
        <div className='add-Udhari-box'>
            <img className='add-Udhari-img' src={profileImg} alt="" />
            <form className='add-Udhari-form' action="/ManageUdhariWS">
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Name   </label>
                <input type="text" className="form-control" id="exampleFormControlInput1" onChange={e => {setUsername(e.target.value)}} value={username} required />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput2" className="form-label">Contact</label>
                <input type="tel" className="form-control" id="exampleFormControlInput2"  onChange={e => {setContact(e.target.value)}} value={contact  || ""} />
            </div>  
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput3" className="form-label">Email  </label>
                <input type="email" className="form-control" id="exampleFormControlInput3" onChange={e => {setEmail(e.target.value)}} value={email || ""}/>
            </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput4" className="form-label">UPI id </label>
                    <input type="text" className="form-control" id="exampleFormControlInput4" onChange={e => {setUpi_id(e.target.value)}} value={upi_id || ""} required/>
                </div>
            </form>
            <div>
                <AmountChangeWS updateAmount={updateAmount} receiveHandler={MoneyReceived} payedHandler={MoneyPayed} />
            </div>
        </div>
        </>
    )
}

import React from 'react'

export default function AmountChangeWS(props) {
  
  const handleAmountChange = (e) => {
    props.updateAmount(e.target.value);
  }

  return (
    <div className='amount-change-box'>
        <div className='amount-change-receive'>
            <label htmlFor="amount-change-receive-input">Money recieved</label>
            <input type="number" min="0" name="amount-change-receive-input" id='amount-change-receive-input' onChange={handleAmountChange} />
            <span className='amount-change-receive-button' onClick={props.receiveHandler}>&#x2713;</span>
        </div>
        <div className='amount-change-payed'>
            <label htmlFor="amount-change-payed-input">Money payed</label>
            <input type="number" min="0" name="amount-change-payed-input" id='amount-change-payed-input' onChange={handleAmountChange}/>
            <span className='amount-change-payed-button' onClick={props.payedHandler}>&#x2713;</span>
        </div>
    </div>
  )
}
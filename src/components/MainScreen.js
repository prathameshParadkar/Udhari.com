import React, {useState, useEffect} from 'react'
import MainList from './MainList'
import Navbar from './Navbar'
import Workspace from './Workspace'
import Data from './Data.js'
import Axios from 'axios';

export default function MainScreen(props) {
  const [isManagerOn, setIsManagerOn] = useState(false)
  const [entries, setEntries] = useState([]);

  const updateEntry = (newEntry) => {
    setEntries([...entries, newEntry])
  }

  useEffect(() => {
    Axios.get(`http://localhost:3001/${props.username}`)
      .then(res => {
        console.log(res.data);
        setEntries(res.data);
      })
      .catch(e => {
        console.log(e);
      })
  }, []);

  return (
    <div className='mainscreen-container'>
    <Navbar isLoggedIn={props.isLoggedIn} username={props.username}/>

    <MainList allEntries = {entries} />
    
    <Workspace isManagerOn={isManagerOn} username={props.username} updateEntry={updateEntry}/>
    </div>
  )
}

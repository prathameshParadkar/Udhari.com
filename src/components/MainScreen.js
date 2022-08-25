import React, {useState, useEffect} from 'react'
// import MainList from './MainList'
import Navbar from './Navbar'
import Workspace from './Workspace'
import Axios from 'axios';
import MainListTile from './MainListTile'
import Img from './images/profile-pic.png'

export default function MainScreen(props) {
  const [isManagerOn, setIsManagerOn] = useState(false)
  const [entries, setEntries] = useState([]);
  const [filtered, setFilteredEntry] = useState(entries);

  function toManageUdhariWS(feeback){
    setIsManagerOn(feeback)
  }

  const updateEntry = (newEntry) => {
    setEntries([...entries, newEntry])
  }

  useEffect(() => {
    Axios.get(`http://localhost:3001/${props.username}`)
      .then(res => {
        // console.log(res.data.entries);
        setEntries(res.data.entries);
        setFilteredEntry(res.data.entries);
      })
      .catch(e => {
        console.log(e);
      })
  }, []);

  const searchUdhari = (e) => {
    let query = e.target.value;
    console.log(query);
    let result = entries.filter((data) => {
      return data.name.search(query) !== -1;
    });
    setEntries(result);
    if(!query){
      setEntries(filtered);
    }
  }

  

  return (
    <div className='mainscreen-container'>
    <Navbar isLoggedIn={props.isLoggedIn} username={props.username}/>

    <div className='mainlist'>
    <input type="text" name="search" className='mainlist-search' placeholder='Search' onChange={searchUdhari}/>
    <div className='mainlist-list'>
          {entries && entries.length > 0 ? entries.map((item) => {
                  return (
                <MainListTile
                      key = {item._id}
                      img={Img}
                      name={item.name}
                      UdhariStatus = {item.udhari.status}
                      UdhariAmount = {item.udhari.amount}
                      managerHandler = {toManageUdhariWS}
                      /> 
                    )}) : <h1>No result found</h1>}
    </div>
    </div>
  <Workspace  managerStatus={isManagerOn} managerStatusHandler={toManageUdhariWS} isManagerOn={isManagerOn} username={props.username} updateEntry={updateEntry}/>
    </div>
  )
}

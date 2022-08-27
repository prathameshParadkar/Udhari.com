import React, {useState, useEffect} from 'react'
// import MainList from './MainList'
import Navbar from './Navbar'
import Data from './Data'
import Workspace from './Workspace'
import Axios from 'axios';
import MainListTile from './MainListTile'
import Img from './images/profile-pic.png'
import RemoveUdhari from './Workspace Components/RemoveUdhari';

export default function MainScreen(props) {
  const [isManagerOn, setIsManagerOn] = useState(false)
  const [entries, setEntries] = useState([]);
  const [filtered, setFilteredEntry] = useState(entries);
  const [activeDiv, setActiveDiv] = useState(0);
  
  //responsive for mobile...->
  const [isResponsive, setIsResponsive] = useState(false);
  const [isResponsiveNavbarOn, setIsResponsiveNavbarOn] = useState(false);
  const [isResponsiveMainListOn, setIsResponsiveMainListOn] = useState(false);
  const [isResponsiveWorkspaceOn, setIsResponsiveWorkspaceOn] = useState(false);
  
  window.onresize = function() {
    if (window.innerWidth <= 820){
      setIsResponsive(true);
      setIsResponsiveMainListOn(true);
    }
    else{
      setIsResponsive(false);
      setIsResponsiveMainListOn(false);
      setIsResponsiveNavbarOn(false);
      setIsResponsiveWorkspaceOn(false);
    }
  }
  function toResponsiveNavbar(){
    setIsResponsiveMainListOn(false);
    setIsResponsiveNavbarOn(true);

  }



  function toManageUdhariWS(feeback){
    setIsManagerOn(feeback)
  }

  const updateEntry = (newEntry) => {
    setEntries([...entries, newEntry])
  }
  const removeEntry = (name) => {
    let newEntries = entries.filter(item => {return item.name !== name})
    setEntries(newEntries);
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
    { ((isResponsiveNavbarOn) || !isResponsive)  &&  <Navbar isLoggedIn={props.isLoggedIn} username={props.username} isResponsiveNavbarOn = {isResponsiveNavbarOn} responsiveNavbarHandler ={setIsResponsiveNavbarOn} responsiveMainListHandler ={setIsResponsiveMainListOn} />}
    {((isResponsiveMainListOn) || !isResponsive) && (<div className='mainlist'>
    {isResponsive && <span onClick={toResponsiveNavbar} className="material-symbols-outlined nav-menu-button"> menu</span>}
    <input type="text" name="search" className='mainlist-search' placeholder='Search' onChange={searchUdhari}/>
    <div className='mainlist-list'>
          {entries && entries.length > 0 ? entries.map((item) => {
                  return (
                    <>
                <MainListTile
                      key = {item._id}
                      img={Img}
                      name={item.name}
                      UdhariStatus = {item.udhari.status}
                      UdhariAmount = {item.udhari.amount}
                      managerHandler = {toManageUdhariWS}
                      manageActiveDiv = {setActiveDiv}
                      /> 
                  </>
                    )}) : <h1>No result found</h1>}
    </div>
    </div>)}
  { ((isResponsiveWorkspaceOn) || !isResponsive) && 
        <Workspace  
          managerStatus={isManagerOn} 
          managerStatusHandler={toManageUdhariWS} 
          isManagerOn={isManagerOn} 
          username={props.username} 
          updateEntry={updateEntry} 
          entries={entries} 
          activeDiv = {activeDiv}         
          removeEntry={removeEntry}
          
         />}    
      </div>
  )
}

//key = {item._id + "key"} 
// name = {item.name}
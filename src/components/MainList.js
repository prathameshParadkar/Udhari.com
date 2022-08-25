import React, {useState} from 'react'
import MainListTile from './MainListTile'
import Img from './images/profile-pic.png'

export default function MainList(props) {
  const [filtered, setFilteredEntry] = useState(props.allEntries);

  // const MainListTileElement = filteredEntry.map((item) => {
    
  //   return (
  //     <MainListTile
  //     key = {item._id}
  //     img={Img}
  //     name={item.name}
  //     UdhariStatus = {item.udhari.status}
  //     UdhariAmount = {item.udhari.amount}
  //     />
  //   )
  // })

  const searchUdhari = (e) => {
    let query = e.target.value;
    console.log(query);
  //  let result = props.allEntries.filter((data) => {
  //     return data.name.search(query) !== -1;
  //     });
  //   setFilteredEntry(result);
  console.log(filtered)
  }
  
  const MainListTileElement = props.allEntries.map((item) => {
    return (
      <MainListTile
      key = {item._id}
      img={Img}
      name={item.name}
      UdhariStatus = {item.udhari.status}
      UdhariAmount = {item.udhari.amount}
      managerHandler = {props.managerStatusHandler}
      />

    )
  })
  

  

  return (
    <div className='mainlist'>
    <input type="text" name="search" className='mainlist-search' placeholder='Search' onChange={searchUdhari}/>
    <div className='mainlist-list'>
      {MainListTileElement}
    </div>
    </div>
  )
}

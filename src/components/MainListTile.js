import React from 'react'
import profileImg from './images/profile-pic.png'

export default function MainListTile(props) {
  const [divStyle, setDivStyle] = React.useState({})
  const [isDivOn, setIsDivOn] = React.useState(false)
  let UdhariColor = props.UdhariStatus === "Udhari_to_pay" ? "#EE6055" : "#60D394";
  let UdhariType = props.UdhariStatus === "Udhari_to_pay" ? "pay Udhari" : "get Udhari";
  const UdhariStyle = {
    color : `${UdhariColor}`
  }

  let selectionDivStyle = {
    backgroundColor : "#F8F8F8",
    borderLeft : 3,
    borderLeftStyle : "solid",
    borderLeftColor : `${UdhariColor}`,
  }

  function divClicked(){
      if(!props.isResponsive){

        setDivStyle((prevState) => {
          return(
            Object.keys(prevState).length === 0 ? selectionDivStyle : {} 
            );
          }
          )
      }
      else{
        props.responsiveMainListHandler(false)
        props.responsiveWorkspaceHandler(true)
      }
          setIsDivOn(true)
        props.manageActiveDiv(props.id)
        Object.keys(divStyle).length === 0 ? props.managerHandler(true) :  props.managerHandler(false)
  }
  
  React.useEffect(() => {
    if (props.isDivClose || isDivOn){
      setDivStyle((prevState) => {
        return(
           {} 
          );
        } 
      )
      props.divCloseHandler(false)
    }
  }, [props.isDivClose])

  return (
    <div className='list-tile' onClick={divClicked} style={divStyle} >
        <img src={profileImg} alt="img" className='list-tile-img'  />
        <p className='list-tile-name' style={UdhariStyle}> {props.name}
        <span style={{
          // borderColor : `${UdhariColor}` , 
          // backgroundColor : `${UdhariColor}`,
          color : "#ABABAB"
        }}>#{UdhariType}</span>
        </p>
        <p className='list-tile-Udhari' style={UdhariStyle}>&#8377; {props.UdhariAmount}</p>
    </div>
  )
}


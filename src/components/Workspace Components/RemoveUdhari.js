import Axios from "axios";
export default function RemoveUdhari(props){
    const removeUdhari = () => {
        if(window.confirm("Are you sure you want to delete this Udhari?")){
            Axios.put(`http://localhost:3001/${props.username}/removeUdhari`, {name: props.name})
            .then(res => {alert(res.data)})
            .catch(e => {console.log(e)});
            props.removeEntry(props.name);
            props.UdhariClose();
        }
    }
    return (
        <button onClick={removeUdhari} className='remove-Udhari-button'>Delete Udhari</button>
    )

}
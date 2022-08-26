import Axios from "axios";
export default function RemoveUdhari(props){
    const removeUdhari = () => {
        Axios.put(`http://localhost:3001/${props.username}/removeUdhari`, {name: props.name})
            .then(res => {alert(res.data)})
            .catch(e => {console.log(e)});
        props.removeEntry(props.name);
    }
    return (
        <button onClick={removeUdhari}>RemoveUdhari</button>
    )

}
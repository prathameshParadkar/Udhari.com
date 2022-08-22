import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import MainList from './components/MainList';
import Workspace from './components/Workspace';
import Login from './components/Login';
import Data from './components/Data';


function App() {
  return (
    <div>
      <Login />
      <Navbar />
      <MainList />
      <Workspace />
    </div>
  );
}

export default App;

import './App.css';
import React, {Component} from "react";
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './components/Login';
// import Data from './components/Data';
import Register from './components/Register';
import MainScreen from './components/MainScreen';


class App extends Component {
  constructor(){
    super()
    this.state = {
      isLoggedIn: false,
      username: null
    }
    this.updateUser = this.updateUser.bind(this);
  }
  updateUser (userObject) {
    this.setState(userObject)
  }
  render() {
    return (
      <div className="App">
      {/* <Navbar updateUser={this.updateUser} isLoggedIn={this.state.isLoggedIn} username={this.state.username} */}
        <BrowserRouter>
        <Routes>
        <Route
          exact path="/"
          element={<Login updateUser={this.updateUser} isLoggedIn={this.state.isLoggedIn} />} />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/home"
          element={<MainScreen />}
        />
        </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

// img error in MainListTile component

export default App;

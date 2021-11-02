import { render } from '@testing-library/react';
import React, {useState,useEffect, Component} from 'react';
import firebase, { auth , firestore } from './firebase';
import Login from './Components/Login';
import Adashboard from './Admin/Adashboard'

class Auth extends Component{
  constructor(propes){
    super(propes);
    this.state={
        user : {}
    }
  }

componentDidMount(){
  this.authLister();
}

  authLister(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({user});
      }
      else{
        this.setState({user : null})
      }
    })
  }

  render(){
    return (
      <div className="App">
       {this.state.user ? (<Adashboard />) : (<Login />)}
      </div>
    );
  }
}

export default Auth;

import React, { useState, useEffect } from 'react'
import { db } from '../backend/firebase'
import { collection, addDoc , getDocs } from "firebase/firestore"
import firebase from '../backend/firebase'

const Delete = () =>{

    const [newName, setnewName] = React.useState("");
    const [newUsername, setnewUsername] = React.useState("");
    const [newPass, setnewPass] = React.useState("");
    const [newClass, setnewClass] = React.useState("");
    const [newDept, setnewDept] = React.useState("");
    const [newCategory, setnewCategory] = React.useState("");
    const [newFee, setnewFee] = React.useState("");

    const Ondelete = () => {
        const db= firebase.firestore();
        db.collection("User")
        .doc(newUsername)
        .delete({
            URN:newUsername,
            Password:newPass,
            Name:newName,
            Class:newClass,
            department:newDept,
            Category:newCategory,
            Fee:newFee
        })
        .then(function(){
            alert("Data Deleted Succesfully...!")
        })
        .catch(function (error) {
            console.error("Error writing Value: ", error);
          });
    };

    return(
        <div className="container-fluid d-flex justify-content-evenly align-items-start flex-wrap mt-5">
            <img src="/img/deletelogo.svg" alt="Delete logo Img" className="w-50" />
            <div className=" d-flex flex-column justify-content-center align-items-start mt-5">
            
                <h6 className="text-danger">Delete Student</h6>
                <label className="me-2 my-2" for="username">Username :</label>
                <input type="text" name="username" id="username" 
                    onChange={(e) => {
                        setnewUsername(e.target.value);
                    }}/>

                <input className="btn btn-primary my-4 align-self-end" type="submit" name="submit" value="Submit" 
                          onClick={Ondelete}
                />
              
            </div>
        </div>
    )
}

export default Delete;
import React, { useState, useEffect } from 'react'
import { db } from '../backend/firebase'
import { collection, addDoc , getDocs } from "firebase/firestore"
import firebase from '../backend/firebase'

const Update = () => {

    const userCollectionRef = collection(db ,"User");

    const [users, setUsers] = useState([]);
    const [filterUser, setfilterUser] = useState([]);



    const [newName, setnewName] = React.useState("");
    const [newUsername, setnewUsername] = React.useState("");
    const [newPass, setnewPass] = React.useState("");
    const [newClass, setnewClass] = React.useState("");
    const [newDept, setnewDept] = React.useState("");
    const [newCategory, setnewCategory] = React.useState("");
    const [newFee, setnewFee] = React.useState("");

    const updateUser = () =>{
        const db = firebase.firestore();
        db.collection("User")
            .doc(newUsername)
            .set({
                URN:newUsername,
                Password:newPass,
                Name:newName,
                Class:newClass,
                department:newDept,
                Category:newCategory,
                Fee:newFee
            })
            .then(function(){
                alert("Data Saved...!")
            })
            .catch(function (error) {
                console.error("Error writing Value: ", error);
              });
    }


    return (
        <>

            <div className="bg-light container-fluid d-flex justify-content-evenly align-items-center flex-wrap py-5">
                
                <img src="/img/updatelogo.svg" alt="Update logo img" className="w-50" />
                <div className=" d-flex flex-column justify-content-center align-items-center mt-4">
                <h6 className="text-danger">Delete Student</h6>

                                <div className=" d-flex justify-content-center align-items-center flex-wrap">
                                    <div className="mx-5">
                                        <div className="div">
                                            <p><label className="me-2" for="username">Username</label></p>
                                            <input type="text" name="username" id="username"
                                                onChange={(e) => {
                                                    setnewUsername(e.target.value);
                                                }}/>
                                                
                                        </div>
                                    
                                        <div className="mt-5">
                                            <p><label for="password">Password</label></p>
                                            <p><input type="text" name="password" id="password"
                                            onChange={(e) => {
                                                setnewPass(e.target.value);
                                            }}/></p>
                                        </div>
                                        <div className="div">
                                            <p><label for="name">Name</label></p>
                                            <p><input type="text" name="name" id="name"
                                                onChange={(e) => {
                                                    setnewName(e.target.value);
                                                }}/></p>
                                        </div>
                                        <div className="div">
                                            <p><label for="class">Class</label></p>
                                            <p><input type="text" name="class" id="class"
                                            onChange={(e) => {
                                                setnewClass(e.target.value);
                                            }}/></p>
                                        </div>
                                        <div className="div">
                                            <p><label for="department">Department</label></p>
                                            <p><input type="text" name="department" id="department"
                                            onChange={(e) => {
                                                setnewDept(e.target.value);
                                            }}/></p>
                                        </div>
                                    </div>
                                                           
                                    <div className="b">
                                    <div className="div">
                                        <p><label for="category">Category</label></p>
                                        
                                        <p><select className="px-5 py-1" type="text" id="category" name="category"
                                        onChange={(e) => {
                                            setnewCategory(e.target.value);
                                        }}
                                        >
                                            <option type="text" name="category" value="open">Open</option>
                                            <option type="text" name="category" value="obc">OBC</option>
                                            <option type="text" name="category" value="nt">NT</option>
                                            <option type="text" name="category" value="sc">SC</option>
                                            <option type="text" name="category" value="tfws">TFWS</option>
                                            </select></p>
                                    </div>
                                    <div className="div">
                                        <p><label for="Fee">Fee</label></p>
                                        <p><input type="text" name="fee" id="fee"
                                        onChange={(e) => {
                                            setnewFee(e.target.value);
                                        }}/></p>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center align-items-start">
                                        <input className="btn btn-primary align-self-end" type="submit" name="submit" value="Update"
                                        onClick={() => {updateUser()}}
                                        />
                                    </div>
                              </div>
                            </div>
                    
                </div>
            </div>
        </>
    )
}

 export default Update;

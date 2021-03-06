import React, { useState, useEffect, useRef } from 'react'
//import { db, firestore } from '../backend/firebase'
//import { collection, addDoc } from "firebase/firestore"
import { useAuth } from "../contexts/AuthContext"
import firebase from '../backend/firebase'
import CryptoJS from 'crypto-js'



const Add = () => {



    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState("")
    const [Loading, setLoading] = useState(false)

    const [newName, setnewName] = React.useState("");
    const [newUsername, setnewUsername] = React.useState("");
    const [newPass, setnewPass] = React.useState("");
    const [newClass, setnewClass] = React.useState("");
    const [newDept, setnewDept] = React.useState("");
    const [newCategory, setnewCategory] = React.useState("");
    const [newFee, setnewFee] = React.useState("");
    const [newDues, setnewDues] = React.useState("");
    const { signup } = useAuth()



    const createUser =  () => {

        const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(newPass),'my-secret-key@123').toString();
        const db = firebase.firestore();
        db.collection("User")
            .doc(newUsername)
            .set({
                URN:newUsername,
                Password:ciphertext,
                Name:newName,
                Class:newClass,
                department:newDept,
                Category:newCategory,
                Fee:newFee,
                Dues:newFee
            })
            .then(function(){
                alert("Data Saved...!")
            })
            .catch(function (error) {
                console.error("Error writing Value: ", error);
            });
    }
       

        async function handleSubmit(e) {
        e.preventDefault()
            
            try {
                setError("")
                setLoading(true)
                

            } catch(err){
                alert("Failed")
                console.log(err);
            }
            setLoading(false)   

    }
    



    


    return (
        <>
            <div className="container-fluid d-flex justify-content-evenly align-items-center flex-wrap mt-5">
            <img src="/img/addlogo.svg" alt="Add logo Img" className="w-50 " />
                <div className="bg-light vh d-flex flex-column justify-content-center align-items-center mt-4">
                {/* {currentUser && currentUser.email} */}
                            <h6 className="text-danger">Add Student</h6>

                <form onSubmit={handleSubmit} className="d-flex justify-content-center align-items-start flex-wrap pb-5">
                    <div className="mx-5">
                        <div className="div">

                            <p><label for="username">Username</label></p>
                            <p><input type="text" name="username" id="username" ref={emailRef}
                                onChange={(e) => {
                                    setnewUsername(e.target.value);
                                }}/></p>
                        </div>
                        <div className="div">
                            <p><label for="password">Password</label></p>
                            <p><input type="text" name="password" id="password" ref={passwordRef}
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
                    <div className="">  
                        <div className="div">
                            <p><label for="category">Category</label></p>
                            {/* <p><input type="text" name="category" id="category" /></p> */}
                            <p><select className="px-5 py-1" type="text" id="category" name="category"
                            onChange={(e) => {
                                setnewCategory(e.target.value);
                            }}
                            >
                                <option type="text" name="category" value="OPEN">OPEN</option>
                                <option type="text" name="category" value="OBC">OBC</option>
                                <option type="text" name="category" value="NT">NT</option>
                                <option type="text" name="category" value="SC">SC</option>
                                <option type="text" name="category" value="TFWS">TFWS</option>
                                </select></p>
                        </div>
                        <div className="div">
                            <p><label for="department">Fees</label></p>
                            <p><input type="number" name="fee" id="fee"
                            onChange={(e) => {
                                setnewFee(e.target.value);
                            }}/></p>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-start">
                            <input className="btn btn-primary align-self-end" type="submit" name="submit" value="Submit"
                            onClick={createUser} disabled={Loading}
                            />
                        </div>
                        </div>
                    </form>
                </div>
                
            </div>
        </>
    )
}

export default Add

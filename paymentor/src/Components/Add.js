import React, { useState, useEffect, useRef } from 'react'
import { db } from '../backend/firebase'
import { collection, addDoc } from "firebase/firestore"
import { useAuth } from "../contexts/AuthContext"




const Add = () => {

    const userCollectionRef = collection(db ,"User");

    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState("")
    const [Loading, setLoading] = useState(false)

    const [newName, setnewName] = useState();
    const [newUsername, setnewUsername] = useState();
    const [newPass, setnewPass] = useState();
    const [newClass, setnewClass] = useState();
    const [newDept, setnewDept] = useState();
    const [newCategory, setnewCategory] = useState();

    const createUser = async () => {
        await addDoc(userCollectionRef, { 
            username: newUsername,
            name: newName ,
            password: newPass, 
            class: newClass,
            department: newDept,
            category:newCategory
        }).then(function(){
            alert("Data Saved...!")
        })
        .catch(function (error) {
            alert("Error writing Value: ");
          });
    }



    // const createuser = () => {
    //     const [currentUser, setCurrentUser] = useState(null);    
    //     const handleSubmit = (e) => {
    //       e.preventDefault();    
    //       const { username, password } = e.target.elements;
    //       try {
    //         firebaseConfig.auth().createUserWithEmailAndPassword(username.value, password.value);      
    //         setCurrentUser(true);
    //       } catch (error) {
    //         alert(error);
    //       }
    //     };

    //     if (currentUser) {
    //         alert(" Added Successfully");
    //     }
    // }

        
    const { signup, currentUser } = useAuth()

        async function handleSubmit(e) {
        e.preventDefault()
            
            try {
                setError("")
                setLoading(true)
                await signup(emailRef.current.value, passwordRef.current.value)
                alert("User added Successfully")

            } catch(err){
                alert("Failed")
                // console.log(Error);
                console.log(err);
            }
            setLoading(false)   

    }



    


    return (
        <>
            <div className="container-fluid d-flex justify-content-center align-items-center ">
                <div className=" d-flex flex-column justify-content-center align-items-center">
                <form onSubmit={handleSubmit}>
                    <div className="div">
                        {currentUser && currentUser.email}
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
                            <option type="text" name="category" value="sc">SC</option>
                            <option type="text" name="category" value="TFWS">TFWS</option>
                            </select></p>
                    </div>
                    <div className="div">
                        <p><input className="btn btn-primary " type="submit" name="submit" value="Submit" 
                        onClick={createUser} disabled={Loading}
                        /></p>
                    </div>
                    </form>
                </div>
                
            </div>
        </>
    )
}

export default Add

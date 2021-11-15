import React from "react";
import{ useState, useEffect, useRef } from 'react'
//import { db, firestore } from '../backend/firebase'
//import { collection, addDoc } from "firebase/firestore"
import { useAuth } from "../contexts/AuthContext"
import firebase from '../backend/firebase'
import CryptoJS from 'crypto-js'

const PasswordChange = () => {

    const[newURN,setnewURN]=useState("");
    const[oldpass,setoldpass]=useState("");
    const[newPassword,setnewPassword]=React.useState("");
    const[conpass,setconpass]=useState("");
    const[info,setinfo]=useState([]);

    const [error, setError] = useState("")
    const [Loading, setLoading] = useState(false)

    const fetchData = () =>{
        const db = firebase.firestore();
        db.collection("User").get()
        .then(querySnapshot => {
            querySnapshot.forEach(ele => {
                 var data = ele.data();
                 setinfo(arr => [...arr,data]);
            });
        })
    }

    const passupdate = (newURN, oldpass) =>{
        const db = firebase.firestore();
        db.collection("User").doc(newURN).get()
        .then(snapshot=>
            check_validte(snapshot,newURN,oldpass)
            )
    }

    const check_validte=(snapshot,newURN,oldpass) => {
        const bytes = CryptoJS.AES.decrypt(snapshot.get("Password"),'my-secret-key@123');
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log(decryptedData);
    
        if(oldpass != decryptedData){
            alert("Wrong");
        }
        else if(newPassword != conpass)
        {
            alert("typing mistake..")
        }
        else if(oldpass == decryptedData && newPassword == conpass )
        {
            const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(conpass),'my-secret-key@123').toString();
    
            const db= firebase.firestore();
            db.collection("User")
            .doc(newURN)
            .update({
                   
                    Password:ciphertext,
                    
            })
            .then(function(){
                alert("Password Changes Succefully...!")
            })
            .catch(function (error) {
                console.error("Error writing Value: ", error);
              });
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
            
            try {
                setError("")
                setLoading(true)
                // await signup(emailRef.current.value+"@paymentor.com", "user@321")
                // alert("User added Successfully")

            } catch(err){
                alert("Failed")
                console.log(err);
            }
            setLoading(false)   

    }
    
       

    return(

        <>
        <div className="container-fluid d-flex justify-content-center align-items-center flex-wrap mt-5">
        <img src="/img/password.svg" alt="Profile img" className="w-50 p-5" />

                <div className="bg-light vh d-flex flex-column justify-content-center align-items-center mt-4">
                {/* {currentUser && currentUser.email} */}
                            <h6 className="text-danger">Change Password</h6>

                <form onSubmit={handleSubmit} className="d-flex justify-content-center align-items-start flex-wrap pb-5">
                    <div className="mx-5">
                        <div className="div">
                            <p><label for="username">URN</label></p>
                            <p><input type="text" name="username" id="username" value={newURN}
                            onChange={(e) => {
                            setnewURN(e.target.value);
                            }}
                            /></p>
                        </div>
                       <div className="div">
 
                            <p><label for="username">Old Password</label></p>
                            <p><input type="text" name="username" id="username" value={oldpass}
                                onChange={(e) => {
                                    setoldpass(e.target.value);
                                }}
                                /></p>
                        </div>
                        <div className="div">
                            <p><label for="password">New Password</label></p>
                            <p><input type="text" name="password" id="password" value={newPassword}
                            onChange={(e) => {
                                setnewPassword(e.target.value);
                            }}
                            />
                            </p>
                        </div>
                        <div className="div">
                            <p><label for="name">Confirm Password</label></p>
                            <p><input type="text" name="name" id="name" value={conpass}
                                onChange={(e) => {
                                    setconpass(e.target.value);
                                }}
                                /></p>
                        </div>
                        <div className="div">                         
                        {/* <div className="d-flex flex-column justify-content-center align-items-start"> */}
                            <p><input className="btn btn-primary align-self-end" name="submit" value="Submit"
                           onClick={()=>passupdate(newURN, oldpass)} 
                          //disabled={Loading}
                            /></p>
                             {/* <button onClick={()=>passupdate(newURN, oldpass)} >Change Password</button> <br/><br/> */}
                        {/* </div> */}
                        </div>
                    </div>
                    
                    </form>
                </div>
                
            </div>


        </>
    );
}

export default PasswordChange
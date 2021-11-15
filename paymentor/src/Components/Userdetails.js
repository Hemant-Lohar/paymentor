import React, { useState, useEffect } from 'react'
import firebase from "../backend/firebase"

const Userdetails = () => {
    const [users, setUsers] = useState([]);
    
    const [info, setinfo] = useState({
        name: "",
        fee: 0,
        Class: "",
        dept: "",
        category:""
    })


    useEffect(() => {
        const ref= firebase.firestore();
        ref.collection("User").doc("19131087").get()
        .then(snapshot=>{setinfo({...info, 
            name: snapshot.get("Name"),
            Class: snapshot.get("Class"),
            dept: snapshot.get("department"),
            category: snapshot.get("Category"),
            fee: snapshot.get("Fee")
            })  
        }
        ) 
    }, [])

    console.log(info);

    return (
        <>
           <div className="bg-light vh-100 container-fluid d-flex justify-content-start ms-4 mt-4 align-items-start flex-wrap">
           <div className="d-flex justify-content-evenly align-items-center flex-wrap">
           <img src="/img/profile.svg" alt="Profile img" className="w-50" />

               <div className="justify-self-start">
                   <table className="fw-normal">
                       <tr>
                           <th>Name </th>
                           <th className="fw-normal ps-2"> : {info.name}</th>
                       </tr>
                       <tr>
                           <th>Department </th>
                           <th className="fw-normal ps-2"> : {info.dept}</th>
                       </tr>
                       <tr>
                           <th>Class </th>
                           <th className="fw-normal ps-2"> : {info.Class}</th>
                       </tr>
                       <tr>
                           <th>Category </th>
                           <th className="fw-normal ps-2"> : {info.category}</th>
                       </tr>
                       <tr>
                           <th>Total Fee </th>
                           <th className="fw-normal ps-2"> : {info.fee}</th>
                       </tr>
                   </table>
               </div>
               
               
           </div>
        </div> 
        </>
    )
}

export default Userdetails

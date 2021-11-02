import React, { useState, useEffect } from 'react'
import { db } from '../backend/firebase'
import { collection, getDocs } from "firebase/firestore"

const Dashboard = () => {

    const [users, setUsers] = useState([]);
    const userCollectionRef = collection(db ,"User");

    useEffect(() => {
        
        const getUsers = async () => {
            const data = await getDocs(userCollectionRef)
            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.username})))
        }

        getUsers()
    }, [])

    

    return (
        <>
           <div className="bg-light vh-100">
                
                    <div className="div">

                    <table className="text-center px-2">
                        <tr className="px-2">
                            <th className="px-5 py-1 fw-normal bg-light border text-primary">UserName</th>
                            <th className="px-5 py-1 fw-normal bg-light border text-primary">Password</th>
                            <th className="px-5 py-1 fw-normal bg-light border text-primary">Name</th>
                            <th className="px-5 py-1 fw-normal bg-light border text-primary">Class</th>
                            <th className="px-5 py-1 fw-normal bg-light border text-primary">Department</th>
                            <th className="px-5 py-1 fw-normal bg-light border text-primary">Category</th>
                        </tr>
                        
                    

                        {/* <p>UserName: {user.username}</p>
                        <p>Password: {user.password}</p>
                        <p>Class: {user.class}</p>
                        <p>Department: {user.department}</p>
                        <p>Category: {user.category}</p> */}
               
                        { users.map((user) => {
                            return (
                                <tr>
                                    <th className="px-5 py-1 fw-normal bg-light border ">{user.username}</th>
                                    <th className="px-5 py-1 fw-normal bg-light border ">{user.password}</th>
                                    <th className="px-5 py-1 fw-normal bg-light border ">{user.name}</th>
                                    <th className="px-5 py-1 fw-normal bg-light border ">{user.class}</th>
                                    <th className="px-5 py-1 fw-normal bg-light border ">{user.department}</th>
                                    <th className="px-5 py-1 fw-normal bg-light border ">{user.category}</th>
                                    
                                </tr>
                                
                            )
                        })}
                    </table>
                </div>
            </div> 
        </>
    )
}

export default Dashboard

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
           <div className="bg-light vh-100 container-fluid">
           <h4 className="text-center my-4"> Student Details</h4>

                
                    <div className="overflow-scroll">

                    <table className="text-center px-2">
                        <tr className="px-2">
                            <th className="px-5 py-1 fw-normal bg-light border text-primary">UserName</th>
                            <th className="px-5 py-1 fw-normal bg-light border text-primary">Password</th>
                            <th className="px-5 py-1 fw-normal bg-light border text-primary">Name</th>
                            <th className="px-5 py-1 fw-normal bg-light border text-primary">Class</th>
                            <th className="px-5 py-1 fw-normal bg-light border text-primary">Department</th>
                            <th className="px-5 py-1 fw-normal bg-light border text-primary">Category</th>
                            <th className="px-5 py-1 fw-normal bg-light border text-primary">Fee</th>
                        </tr>
                        
                
               
                        { users.map((user) => {
                            return (
                                <tr>
                                    <th className="px-5 py-1 fw-normal bg-light border ">{user.URN}</th>
                                    <th className="px-5 py-1 fw-normal bg-light border ">{user.Password}</th>
                                    <th className="px-5 py-1 fw-normal bg-light border ">{user.Name}</th>
                                    <th className="px-5 py-1 fw-normal bg-light border ">{user.Class}</th>
                                    <th className="px-5 py-1 fw-normal bg-light border ">{user.department}</th>
                                    <th className="px-5 py-1 fw-normal bg-light border ">{user.Category}</th>
                                    <th className="px-5 py-1 fw-normal bg-light border ">{user.Fee}</th>                                  
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

import React, { useState, useEffect } from 'react'
import { db } from '../backend/firebase'
import { collection, getDocs } from "firebase/firestore"

const Pdashboard = () => {

    const [users, setUsers] = useState([]);
    const userCollectionRef = collection(db ,"Payment");

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
               <h4 className="text-center my-4"> Payment Details</h4>
                
                    <div className="overflow-scroll">

                    <table className="text-center px-2">
                        <tr className="px-2">
                            <th className="px-5 py-1 fw-normal bg-light border text-primary">UserName</th>
                            <th className="px-5 py-1 fw-normal bg-light border text-primary">Name</th>
                            <th className="px-5 py-1 fw-normal bg-light border text-primary">Amount</th>
                            <th className="px-5 py-1 fw-normal bg-light border text-primary">Payment ID</th>
                            <th className="px-5 py-1 fw-normal bg-light border text-primary">Date</th>
                            <th className="px-5 py-1 fw-normal bg-light border text-primary">Time</th>
                        </tr>
                        
               
                        { users.map((user) => {
                            return (
                                <tr>
                                    <th className="px-5 py-1 fw-normal bg-light border ">{user.URN}</th>
                                    <th className="px-5 py-1 fw-normal bg-light border ">{user.Name}</th>
                                    <th className="px-5 py-1 fw-normal bg-light border ">{user.Amount}</th>
                                    <th className="px-5 py-1 fw-normal bg-light border ">{user.PaymentId}</th>
                                    <th className="px-5 py-1 fw-normal bg-light border ">{user.Date}</th>
                                    <th className="px-5 py-1 fw-normal bg-light border ">{user.Time}</th>
                                </tr>
                                
                            )
                        })}
                    </table>
                </div>
            </div> 
        </>
    )
}

export default Pdashboard

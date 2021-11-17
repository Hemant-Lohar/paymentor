import React, { useRef, useState, useEffect } from "react"
 import axios from "axios"
 import Generatepdf from "./Generatepdf"
 import { useAuth } from "../contexts/AuthContext"
import firebase from '../backend/firebase'
import { useLocation , useHistory } from "react-router-dom"

 
 function loadScript(src) {

    return new Promise(resolve => {
        const script = document.createElement('script')
        script.src = src
        
    
        script.onload = () => {
            resolve(true)
        }

        script.onerror= () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })

}


const Payment = () => {

    const [amount, setamount] = useState()
    const [feeamount, setfeeamount] = useState()
    const [orderId, setorderId] = useState("")
    const [paymentId, setpaymentId] = useState("")
    const [totalFee, settotalFee] = useState(0)
    const [name, setname] = useState("")

    const currDate = new Date().toLocaleDateString()
    const currTime = new Date().toLocaleTimeString()

    let location = useLocation();
    let history = useHistory();

    const userUrn = location.state;
    console.log(userUrn);


    const { currentUser } = useAuth()
    const namestr = currentUser &&currentUser.email

    

    useEffect(() => {
        const ref= firebase.firestore();
        ref.collection("User").doc(localStorage.getItem("username")).get()
        .then(snapshot=>{
            
            settotalFee(snapshot.get("Dues"))
            setname(snapshot.get("Name"))
            }  
        
        ) 
    }, [])
    
    async function dispalyRazorpay () {

        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if(!res) {
            alert("Razorpay SDK Failed to Load Check INternet Connection !")
        }

        
        axios.post('http://localhost:8000/razorpay',{amt:amount}).then((info) => {

        
        setorderId(info.data.id)
        
        
        
        
        var options = {
            "key": "rzp_test_92sXJEdsMzESab", 
            "amount": info.data.amount * 100, 
            "currency": "INR",
            "name": "Paymentor",
            "description": "Fee Transaction",
            "image": "http://localhost:8000/logo.svg",
            "order_id": info.data.id, 
            "handler": function (response){
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);

                setorderId(response.razorpay_order_id)
                setpaymentId(response.razorpay_payment_id)

                const db = firebase.firestore();
                db.collection("Payment")
                .doc(localStorage.getItem("username"))
                .set({
                URN:localStorage.getItem("username"),
                Name:name,
                Amount:amount,
                Date:currDate,
                OrderId:response.razorpay_order_id,
                PaymentId:response.razorpay_payment_id,
                Time:currTime
                })
                .catch(function (error) {
                    console.error("Error writing Value: ", error);
                });

               
            db.collection("User")
                .doc(localStorage.getItem("username"))
                .update({
                    Dues: (totalFee-amount)
                })
                .then(function(){
                    alert("Payment Successfull !")
                })
                .catch(function (error) {
                    console.error("Error writing Value: ", error);
                });

            }
            
        }
        const paymentObj = new window.Razorpay(options);
        paymentObj.open()
    }).catch((err)=> {console.log(err);}) 

    
            
    }

    return (
        <>
            
                <div className="container">
                    <div className="d-flex align-items-center justify-content-evenly flex-wrap mt-5 ps-4">
                        <img src="/img/pay.svg" alt="payment img" className="w-50 " />
                        <div className="mt-4">
                            <p>Fee Payment</p>

                                    <p><label for="inputAmount">Enter Amount </label></p>
                                    <p><input type="text" name="inputAmount" id="inputAmount" required
                                    onChange={(e) => {
                                        setamount(e.target.value);
                                    }} />
                                    <button className="btn btn-primary rounded-pill px-4 ms-4"
                                        onClick={dispalyRazorpay}
                                    >Pay</button>
                                    </p>

                                    <div className="d-flex align-items-center justify-content-center flex-column mt-5">
                                        <p>Generate Receipt</p>
                                        <Generatepdf />
                                    </div>
                        </div>
                    </div>
                    
                </div>
        </>
    )
}


export default Payment

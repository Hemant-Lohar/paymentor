import React, { useRef, useState, useEffect } from "react"
 import axios from "axios"
 import Generatepdf from "./Generatepdf"
 import { useAuth } from "../contexts/AuthContext"
import firebase from '../backend/firebase'
import { useLocation , useHistory } from "react-router-dom"

//  import { db } from '../backend/firebase'
//  import { collection, getDocs,doc, getDoc } from "firebase/firestore"


 
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

    const currDate = new Date().toLocaleDateString()
    const currTime = new Date().toLocaleTimeString()

    let location = useLocation();
    let history = useHistory();

    const userUrn = location.state;
    console.log(userUrn);


    const { currentUser } = useAuth()
    const namestr = currentUser &&currentUser.email

    // const [paydata, setpaydata] = useState([])
    // const [userDetails, setUserDetails] = useState('')
    // const userCollectionRef = collection(db ,"User");
    // const userRef = userCollectionRef.doc('19131087');
    // const doc =  userRef.get();
    // if (!doc.exists) {
    // console.log('No such document!');
    // } else {
    // console.log('Document data:', doc.data());
    // }

    useEffect(() => {
        const ref= firebase.firestore();
        ref.collection("User").doc(localStorage.getItem("username")).get()
        .then(snapshot=>{
            
            settotalFee(snapshot.get("Fee"))
            }  
        
        ) 
    }, [])
    
    async function dispalyRazorpay () {

        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if(!res) {
            alert("Razorpay SDK Failed to Load Check INternet Connection !")
        }

        // axios.post("http://localhost:8000/razorpay", amount).then((res)=> {
        //         console.log(res);
        //     }).catch((err) => {
        //         console.log(err);
        //     })

        axios.post('http://localhost:8000/razorpay',{amt:amount}).then((info) => {

        
        setorderId(info.data.id)
        
        // alert(orderId);
        // alert(info.data.id);
        // alert(amount)
        
        
        var options = {
            "key": "rzp_test_92sXJEdsMzESab", // Enter the Key ID generated from the Dashboard
            "amount": info.data.amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Paymentor",
            "description": "Fee Transaction",
            "image": "http://localhost:8000/logo.svg",
            "order_id": info.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response){
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature);

                setorderId(response.razorpay_order_id)
                setpaymentId(response.razorpay_payment_id)

                const db = firebase.firestore();
                db.collection("Payment")
                .doc(localStorage.getItem("username"))
                .set({
                URN:localStorage.getItem("username"),
                Amount:amount,
                Date:currDate,
                OrderId:response.razorpay_order_id,
                PaymentId:response.razorpay_payment_id,
                Time:currTime
                })
                .then(function(){
                    alert("Data Saved...!")
                })
                .catch(function (error) {
                    console.error("Error writing Value: ", error);
                });

                // const db = firebase.firestore();
            db.collection("User")
                .doc(localStorage.getItem("username"))
                .update({
                    Dues: (totalFee-amount)
                })
                .then(function(){
                    alert("Data Saved...!")
                })
                .catch(function (error) {
                    console.error("Error writing Value: ", error);
                });

            },
            "prefill": {
                //  name
                // "email": "gaurav.kumar@example.com",
                // "contact": "9999999999"
            }
        }
        const paymentObj = new window.Razorpay(options);
        paymentObj.open()
    }).catch((err)=> {console.log(err);}) 

    //    axios.get('http://localhost:8000/razorpay', {amt: inputAmount}).then(responce => {console.log(responce);}

    //    ).catch(err => {console.log(err);})
        
        // const data () => {
        //     axios.get('http://localhost:8000/razorpay')
        //         .then(res => {
        //             this.setState({ setpaydata: res.data });
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //         })
        // }
            
    }

    return (
        <>
            
                <div className="container">
                    <div className="d-flex align-items-center justify-content-evenly flex-wrap mt-5">
                        <img src="/img/pay.svg" alt="payment img" className="w-50 " />
                        <div className="mt-4">
                            <p>Fee Payment</p>

                                    <p><label for="inputAmount">Enter Amount </label></p>
                                    <p><input type="text" name="inputAmount" id="inputAmount" required
                                    onChange={(e) => {
                                        setamount(e.target.value);
                                    }}/>
                                    <button className="btn btn-primary rounded-pill px-4 ms-4"
                                        onClick={dispalyRazorpay}
                                    >Pay</button>
                                    </p>

                                    <div className="d-flex align-items-center justify-content-center flex-column mt-5">
                                        <p>Generate Receipt</p>
                                        <Generatepdf />
                                        {/* <button className="btn btn-success rounded-pill px-4"
                                            onClick={dispalyRazorpay}
                                        >Generate</button> */}
                                    </div>
                        </div>
                    </div>
                    
                </div>
        </>
    )
}


export default Payment

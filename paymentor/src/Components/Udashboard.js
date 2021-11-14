import React, {useState} from 'react'
import '../index.css';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"
import {useHistory} from "react-router-dom"
import Login from './Login';
import Add from './Add';
import Update from './update';
import Payment from './Payment';
import Userdetails from './Userdetails';

  const routes = [
    {
      path: "/userdetails",
      exact: true,
      main: () => <Userdetails /> 
    },
    {
      path: "/payment",
      exact: true,
      main: () => <Payment />
    }
    
  ];

const Udashboard = () => {
    const width=800;
    let history = useHistory();
    const [toggler, settoggler] = useState(false)

    const toggle = () => settoggler(!toggler)
    const show = () => {
        if (width <1024) {
            settoggler(!toggler)
        }
    }
    return (
        <>
         <Router>
            <div className="container-fluid">
                <div className="d-flex justify-content-between py-4">
                    <h4 className="ms-4 ">Paymentor</h4>
                    <button type="button" class="btn btn-outline-primary rounded-pill me-4"
                    onClick={
                        () => {
                            history.push('/adminlogin')
                        }}>Sign Out</button>
                </div>

                <div className="bg-light row vh-100">
                    <div className={toggler ?"box1 vh-100 col-lg-2":"box1 vh-100 col-lg-2 active"}>

                    <div className="position-relative close-btn">
                    {toggler ?<i className="fas fa-times text-info fs-4 position-absolute top-0 end-0 mt-3 me-2" onClick={toggle}>
                        
                        </i> :
                        <i className="fas fa-bars text-info fs-4 position-absolute top-0 end-0 mt-3 me-2" onClick={toggle}>
                        
                        </i>
                        }
                    </div>
   
                    {toggler ?<div className="slidebar d-flex flex-column mt-5">
                            <Link to="/userdetails" >
                                <div className="px-2 py-2 ">
                                    Dashboard
                                </div>
                                <hr />
                            </Link>
                            
                            <Link to="/payment" >
                                <div className="px-2 py-2 ">
                                    Pay Fees
                                </div>
                                <hr />
                            </Link>
                           
                            </div> : null}
                    </div>

                    <div className="box2 px-0 col-lg-10">
                        <div className="d-flex justify-content-center">
                        <Switch>
                            {routes.map((route, index) => (
                            
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    children={<Route exact path={route.path} component={route.main}/>
                            }
                                />
                            ))}
                        </Switch>
                        </div>
                        
                    </div>
                </div>
            </div>
            </Router>
        </>
    )
}

export default Udashboard














// import React,{useState} from 'react'
// import '../index.css';
// import {useHistory} from "react-router-dom"


// // razorpay

// function loadScript(src) {
//   return new Promise(resolve => {
    
//     const script = document.createElement('script')
//     script.src = src
//     document.body.appendChild(script)
//     script.onload = () => {
//       resolve(true)
//     }
//     script.onerror= () => {
//       resolve(false)
//     }
//     document.body.appendChild(script)
//   })
// }

// //


//   const routes = [
//     {
//       path: "/dashboard",
//       exact: true,
//       main: () => <h2>Home</h2>
//     },
//     {
//       path: "/add",
//       main: () => <h2>add</h2>
//     },
//     {
//       path: "/delete",
//       main: () => <h2>delete</h2>
//     }
//   ];

// const Udashboard = () => {

//   let history = useHistory();

// 	const [name, setName] = useState('Mehul')

// 	async function displayRazorpay() {
// 		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

// 		if (!res) {
// 			alert('Razorpay SDK failed to load. Are you online?')
// 			return
// 		}

// try {
  

// 	const data = await fetch('http://localhost:8000/razorpay', { method: 'POST' }).then((t) =>
// 			t.json()
// 		)} catch (error) {
//       console.log(error)
//     }

// 		console.log(data)

// 		const options = {
// 			key:  'rzp_test_92sXJEdsMzESab',
// 			currency: data.currency,
// 			amount: data.amount.toString(),
// 			order_id: data.id,
// 			name: 'Paymentor',
// 			description: 'Thank you for nothing. Please give us some money',
// 			image: 'http://localhost:8000/logo.svg',
// 			handler: function (response) {
// 				alert(response.razorpay_payment_id)
// 				alert(response.razorpay_order_id)
// 				alert(response.razorpay_signature)
// 			},
// 			prefill: {
// 				name,
// 				email: 'sdfdsjfh2@ndsfdf.com',
// 				phone_number: '9899999999'
// 			}
// 		}
// 		const paymentObject = new window.Razorpay(options)
// 		paymentObject.open()
// 	}

//     return (
//         <>
//             <div className="container">
            
//                 <div className="d-flex justify-content-between my-4">
//                     <h4 className="">Paymentor</h4>
//                     <button type="button" class="btn btn-outline-primary rounded-pill"
//                     onClick={
//                       () => {
//                           history.push('/')
//                       } }>Sign Out</button>
//                 </div>

//                 <div className="row">
//                     <div className="box1 vh-100  col-lg-2">
                        

//                     </div>
//                     <div className="box2 vh-100 col-lg-10 d-flex justify-content-center align-items-center">
//                         {/* <a href="https://pages.razorpay.com/pl_H8GYbd9C2dDq7W/view" data-url="https://pages.razorpay.com/pl_H8GYbd9C2dDq7W/view" class="banner-button btn rounded-pill btn-outline-primary btn-lg px-5" href="https://rzp.io/l/gIJ8gSwEB" role="button">pay</a> */}

//                         <button type="submit" className="btn btn-primary rounded-pill px-4 py-1" 
//                         onClick={displayRazorpay}>Pay</button>

//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Udashboard

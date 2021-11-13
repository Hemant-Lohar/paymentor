import React, { useRef, useState } from "react"
import '../index.css';
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import firebase from "../backend/firebase"

// import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// const schema = yup.object().shape({
//     username: yup.string().required(),
//     password: yup.string().min(4).max(8).required()
// })

const Login = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const[newUsername,setnewUsername]=useState("");
    const[newPassword,setnewPassword]=useState("");
    const[info,setinfo]=useState([]);

    // 
    
    async function handleSubmit(e) {
        e.preventDefault()

        try {
        setError("")
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        history.push("/userdashboard")
        } catch {
        setError("Failed to log in")
        // alert("Enter Valid Username & Password !")
        }

        setLoading(false)
    }



//     const userRef = useRef()
//     const passwordRef = useRef()
//     // const { login } = useAuth()
//     const [error, setError] = useState("")
//     const [loading, setLoading] = useState(false)
//     const history = useHistory()

//     const [users, setUsers] = useState([]);
//     const userCollectionRef = collection(db ,"User");

//     const [currentUsername, setcurrentUsername] = useState()
//     const [currentUserpass, setcurrentUserpass] = useState()
//     const [inputUsername, setinputUsername] = useState()
//     const [inputUserpass, setinputUserpass] = useState()

//     useEffect(() => {
    
//     const getUsers = async () => {
//         const data = await getDocs(userCollectionRef)
//         setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.username})))
//         }

//         getUsers()
//     }, [])
//     // emailRef.current.value, passwordRef.current.value
    
//     const loginuser = () => {
//         setcurrentUsername( users.find((user) => {
//             return ( user.username  === inputUsername) 
//         }))

//         setcurrentUserpass( users.find((user) => {
//             return (user.password === inputUserpass) 
//         })
//         )

//         try {if (currentUsername.username == inputUsername) {
//             history.push("/userdashboard")
//         } else {
//             alert("Input Correct Details")
//         }} catch(err) {
//             console.log(err);
//         }
//         console.log(currentUsername);
//         console.log(inputUsername);
        

//     }

//     // async function handleSubmit(e) {
//     //     e.preventDefault()

//     //     try {
//     //     setError("")
//     //     setLoading(true)
//     //     await loginuser(inputUsername, inputUserpass)
//     //     history.push("/userdashboard")
//     //     } catch {
//     //     alert("Failed to log in")
//     //     // alert("Enter Valid Username & Password !")
//     //     }

//     //     setLoading(false)
//     // }
    


//     // async function handleSubmit(e) {
//     //     e.preventDefault()

//     //     try {
//     //     setError("")
//     //     setLoading(true)
//     //     await login(userRef.current.value, passwordRef.current.value)
//     //     history.push("/")
//     //     } catch {
//     //     setError("Failed to log in")
//     //     }

//     //     setLoading(false)
//     // }


// //     const { register, handleSubmit, errors } = useForm({
// //     resolver: yupResolver(schema),
// //   });

// //     const onSubmit = (data) => {
// //         console.log(data);
// //     };
const checkOnlineStatus = async () => {
    try {
      const online = await fetch("/1pixel.png");
      return online.status >= 200 && online.status < 300; // either true or false
    } catch (err) {
      return false; // definitely offline
    }
  };
//   setInterval(async () => {
//   const result = await checkOnlineStatus();
//   const statusDisplay = document.getElementById("status");
//   statusDisplay.textContent = result ? "Online" : "OFFline";
// }, 3000); // probably too often, try 30000 for every 30 seconds
window.addEventListener("load", async (event) => {
    const status = ""
      status = (await checkOnlineStatus())
      ? "Online"
      : "OFFline";

      setError(status)
  });
                        
    return (
        <>
           {/* <div className="main vh-100" style={{backgroundImage:"url(./images/Background1.svg)"}}> */}
               
               <div className="bgcolor row vh-100">
                
                    <div className="part1 col-md-6 d-flex flex-column justify-content-center align-items-center">
                        {/* <img src="/paylogo.svg" alt="logo" className="w-50" /> */}
                        <h1 className="title fw-bold"><span className="fw-light">ADCET </span> Paymentor</h1>
                        
                    </div>
                    
                    <div className="part2 col-md-6 bg-white br d-flex flex-column justify-content-start justify-content-md-center align-items-center">
                   
                        
                          <button type="button" className="btn login-btn btn-outline-primary rounded-pill" 
                          onClick={() => {history.push('/adminlogin')}} >Admin Login</button>
                    
                    
                        <div className="form">
                                <div className="l-title">
                                    <h5 className="fw-bold mb-4 fs-3">Log in</h5>
                                </div>
                                <div className="error">
                                    <p className="text-danger ">{error}</p>
                                </div>
                                {/* action="#" method="post" */}
                                <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
                            
                                        <div class="form-group mb-3">
                                            <input type="text" class="form-control" name="username" id="username" placeholder="username" ref={emailRef} 
                                            onChange={e=> setnewUsername(e.target.value)}
                                            />
                                        </div>
                                        <div class="form-group mb-5">
                                            <input type="password" class="form-control" name="password" id="password" placeholder="password" ref={passwordRef}
                                            onChange={e=> setnewPassword(e.target.value)}
                                            />
                                        </div>
                                        <input className="btn btn-primary px-4 py-2 w-100" type="button" value="Login" disabled={loading} type="submit"/>
                                        {/* <button onClick={()=>Oncheck(newUsername,newPassword)} className="btn btn-primary px-4 py-2 w-100" disabled={loading} type="submit">Login</button>
                                         */}
                                </form>
                        </div>
                                

                    </div>
                   
                    
                    {/* <div className="container-lg flex-column d-flex align-items-center justify-content-center bg-white shadow br part2">
                       

                            <div className="align-items-end w-50">
                            <h5 className="fw-bold mb-3 fs-3 align-self-start">Log in</h5>
                                <form className="d-flex flex-column align-items-center" action="#" method="post">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" name="username" id="username" placeholder="username" />
                                    <label for="username">Username</label>
                                </div>
                                <div class="form-floating mb-5">
                                    <input type="password" class="form-control" name="password" id="password" placeholder="password"/>
                                    <label for="password">Password</label>

                                </div>
                                <input className="btn btn-primary px-4 py-2" type="button" value="Login" />
                                </form>
                                

                            </div>
                    </div> */}

                </div>
                    
                    
            {/* </div> */}

                

           
        </>
    )

}

export default Login

import React, { useRef, useState } from "react"
import '../index.css';
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"


const Adminlogin = () => {


    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const { signup, currentUser } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
        setError("")
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        history.push("/admindashboard")
        } catch {
        setError("Failed to log in")
        alert("Enter Valid Username & Password !")
        }

        setLoading(false)
    }

    return (
        <>
           {/* <div className="main vh-100" style={{backgroundImage:"url(./images/Background1.svg)"}}> */}
               
               <div className="bgcolor row vh-100">
                
                    <div className="part1 col-md-6 d-flex justify-content-center align-items-center">
                        
                        <h1 className="title fw-bold"><span className="fw-light">ADCET </span> Paymentor</h1>
                        
                    </div>
                    
                    <div className="part2 col-md-6 bg-white br d-flex flex-column justify-content-start justify-content-md-center align-items-center">
                   
                        
                        <button type="button" className="btn login-btn btn-outline-primary rounded-pill" 
                          onClick={() => {history.push('/')}} >User Login</button>
                    
                        <div className="form">
                                <div className="l-title">
                                    <h5 className="fw-bold mb-4 fs-3">Admin Log in</h5>
                                </div>
                                <div className="error">
                                    <p className="text-danger ">{error}</p>
                                </div>

                            <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
                            
                                    <div class="form-group mb-3">
                                        <input type="text" class="form-control" name="username" id="username" placeholder="username" ref={emailRef} />
                                    </div>
                                    <div class="form-group mb-5">
                                        <input type="password" class="form-control" name="password" id="password" placeholder="password" ref={passwordRef}/>
                                    </div>
                                    <input className="btn btn-primary px-4 py-2 w-100" type="button" value="Login" disabled={loading} type="submit"
                                     />
                            </form>
                        </div>
                                

                    </div>
                   

                </div>
                    
                    
            {/* </div> */}

                

           
        </>
    )

}

export default Adminlogin

import React, {useEffect, useState} from 'react'
import '../index.css';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"
import {useHistory} from "react-router-dom"
import Login from './Login';
import Add from './Add';
import Update from './update';
import Payment from './Payment';
import Userdetails from './Userdetails';

import PasswordChange from './PasswordChange';
import { useLocation } from 'react-router-dom';

  const routes = [
    {
      path: "/userdashboard",
      exact: true,
      main: () => <Userdetails /> 
    },
    {
      path: "/payment",
      exact: true,
      
      main: () => <Payment />
    },
    {
        path: "/passwordChange",
        exact: true,
        main: () =><PasswordChange />
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
   
                    {toggler ?<div className="slidebar d-flex flex-column mt-5" onClick={show}>
                            <Link to="/userdashboard" >
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

                            <Link to="/passwordChange" >
                                <div className="px-2 py-2 ">
                                    Change Password
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
                                    children={<Route exact path={route.path} component={route.main}   />
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















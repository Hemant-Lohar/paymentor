import React, {useState} from 'react'
import '../index.css';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"
import {useHistory} from "react-router-dom"
import Login from './Login';
import Add from './Add';
import Dashboard from './dashboard';
import Update from './update';
import Pdashboard from './Pdashboard';
import { useAuth } from "../contexts/AuthContext"
import Delete from './delete';


//   const routes = [
//     {
//       path: "/dashboard",
//       exact: true,
//       main: () => <Dashboard />
//     },
//     {
//       path: "/add",
//       exact: true,
//       main: () => <Add />
//     },
//     {
//       path: "/update",
//       exact: true,
//       main: () => <Update />
//     },
//     {
//       path: "/delete",
//       exact: true,
//       main: () => <h2>delete</h2>
//     }
//   ];
  const routes = [
    {
      path: "/admindashboard",
      exact: true,
      main: () => <Dashboard />
    },
    {
      path: "/admindashboard/add",
      exact: true,
      main: () => <Add />
    },
    {
      path: "/admindashboard/update",
      exact: true,
      main: () => <Update />
    },
    {
      path: "/admindashboard/delete",
      exact: true,
      main: () => <Delete />
    },
    {
      path: "/admindashboard/paymentdetails",
      exact: true,
      main: () => <Pdashboard />
    }
  ];

const Adashboard = () => {
    const width = 800;
    let history = useHistory();
    const {currentUser } = useAuth()

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
                <div className="d-flex justify-content-between mt-4">
                    <h4 className="ms-4">Paymentor</h4>
                    
                      {/* {currentUser && currentUser.email} */}<p> 
                      <button type="button" class="btn btn-outline-primary rounded-pill me-4"
                        onClick={
                        () => {
                            history.push('/adminlogin')
                        } }>Sign Out</button></p>  
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
   
                    {toggler ? <div className="slidebar d-flex flex-column mt-5" onClick={show}>
                            <Link to="/admindashboard" >
                                <div className="px-2 py-2 ">
                                    Dashboard
                                </div>
                                <hr />
                            </Link>
                            <Link to="/admindashboard/paymentdetails" >
                                <div className="px-2 py-2 ">
                                    Payment Details
                                </div>
                                <hr />
                            </Link>
                            
                            <Link to="/admindashboard/add" >
                                <div className="px-2 py-2 ">
                                    Add Student Data
                                </div>
                                <hr />
                            </Link>
                            <Link to="/admindashboard/update" >
                                <div className="px-2 py-2 ">
                                    Update Student Data
                                </div>
                                <hr />
                            </Link>
                            <Link to="/admindashboard/delete" >
                                <div className="px-2 py-2 ">
                                    Delete Student Data
                                </div>
                                <hr />
                            </Link>
                            </div> : null}
                    </div>

                    <div className="box2 px-0 col-lg-10">
                        <div className="d-flex justify-content-end">
  
                        </div>
                        {/* <Route exact path="/admindashboard" component={Dashboard} />
                        <Route  path="/admindashboard/add" component={Add} /> */}
                        <Switch>
                            {routes.map((route, index) => (
                            
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    children={<route.main/>}
                                />
                            ))}
                        </Switch>
                    </div>
                </div>
            </div>
            </Router>
        </>
    )
}

export default Adashboard
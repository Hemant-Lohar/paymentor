import React from 'react'
import '../index.css';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"
import {useHistory} from "react-router-dom"
import Login from './Login';
import Add from './Add';
import Dashboard from './dashboard';
import Update from './update';
import { useAuth } from "../contexts/AuthContext"

  const routes = [
    {
      path: "/dashboard",
      exact: true,
      main: () => <Dashboard />
    },
    {
      path: "/add",
      exact: true,
      main: () => <Add />
    },
    {
      path: "/update",
      exact: true,
      main: () => <Update />
    },
    {
      path: "/delete",
      exact: true,
      main: () => <h2>delete</h2>
    }
  ];

const Adashboard = () => {

    let history = useHistory();

    const {currentUser } = useAuth()



    return (
        <>
         <Router>
            <div className="container-fluid">
                <div className="d-flex justify-content-between my-4">
                    <h4 className="ms-4 ">Paymentor</h4>
                    
                      <p>{currentUser && currentUser.email}
                      <button type="button" class="btn btn-outline-primary rounded-pill me-4"
                    onClick={
                        () => {
                            history.push('/adminlogin')
                        } }>Sign Out</button></p>  
                </div>
                

                <div className="row vh-100">
                    <div className="box1 vh-100 col-lg-2">

                    <div className="position-relative close-btn">
                        <i className="fas fa-times text-info fs-4 position-absolute top-0 end-0 mt-3 me-2">
                            
                        </i>
                    </div>
   
                            <div className="slidebar d-flex flex-column mt-5">
                            <Link to="/dashboard" >
                                <div className="px-2 py-2 ">
                                    Dashboard
                                </div>
                                <hr />
                            </Link>
                            
                            <Link to="/add" >
                                <div className="px-2 py-2 ">
                                    Add Student Data
                                </div>
                                <hr />
                            </Link>
                            <Link to="/update" >
                                <div className="px-2 py-2 ">
                                    Update Student Data
                                </div>
                                <hr />
                            </Link>
                            <Link to="/delete" >
                                <div className="px-2 py-2 ">
                                    Delete Student Data
                                </div>
                                <hr />
                            </Link>
                            </div>
                    </div>

                    <div className="box2 px-0 col-lg-10">
                        <div className="d-flex justify-content-end">
  
                        </div>
                        <Switch>
                            {routes.map((route, index) => (
                            
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    children={<Route exact path={route.path} component={route.main}/>}
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
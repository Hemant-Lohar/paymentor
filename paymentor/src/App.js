import Adashboard from "./Components/Adashboard";
import Login from './Components/Login'
import Udashboard from './Components/Udashboard'
import Adminlogin from './Components/Adminlogin'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {useHistory} from "react-router-dom"
import Adlogin from "./Components/Alogin";
import { AuthProvider } from "./contexts/AuthContext";



function App() {
  return (
    <>
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          {/* <Route exact path="/" component={Adlogin}/> */}
          <Route exact path="/adminlogin" component={Adminlogin}/>
          <Route exact path="/userdashboard" component={Udashboard}/>
          <Route exact path="/admindashboard" component={Adashboard}/>
        </Switch>
      </Router>
    </AuthProvider>

    </>
  );
}

export default App;
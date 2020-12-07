import {BrowserRouter as Router, Route} from 'react-router-dom'
import LaunchEHR from "./LaunchEHR";
import Result from "./Result";
import LaunchStandalone from "./LaunchStandalone";

function App() {

    return (
        <div>
            <Router>
                <Route path='/LaunchFromEHR' component={LaunchEHR}/>
                <Route path='/LaunchStandalone' component={LaunchStandalone}/>
                <Route path='/Result' component={Result}/>
            </Router>
        </div>
    );
}

export default App;

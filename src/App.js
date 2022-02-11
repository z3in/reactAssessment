import React from "react";
import { BrowserRouter as Router,Switch,Route,Link } from 'react-router-dom'
import Task1 from './tasks/Task1'
import Task2 from './tasks/Task2'
import Task3 from './tasks/Task3'
import Task4 from './tasks/Task4'
import Task5 from './tasks/Task5'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="p-5">
    <Router>
        <Switch>
            <Route exact path="/">
              <ul>
              <li><Link to="/task1">TASK1</Link></li>
              <li><Link to="/task2">TASK2</Link></li>

              <li><Link to="/task3">TASK3</Link></li>

              <li><Link to="/task4">TASK4</Link></li>

              <li><Link to="/task5">TASK5</Link></li>
              </ul>
            </Route>
            <Route exact path="/task1">
                <Task1/>
            </Route>
            <Route exact path="/task2">
              <Task2/>
            </Route>
            <Route exact path="/task3">
              <Task3/>
            </Route>
            <Route exact path="/task4">
              <Task4/>
            </Route>
            <Route exact path="/task5">
              <Task5/>
            </Route>
        </Switch>
      
    </Router>
    </div>
  );
}

export default App;

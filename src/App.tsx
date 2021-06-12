import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Dashboard from './pages/Dashboard/Dashboard';
import Counter from './pages/Counter/Counter';
import Employees from './pages/Employees/Employees';

function App() {
  return (
    <Router>
      <NavBar />

      <main>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/counter">
            <Counter />
          </Route>
          <Route path="/employees">
            <Employees />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;

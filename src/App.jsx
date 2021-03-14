import './App.css';
import Main from './pages/Main';
import Detail from './pages/Detail';
import Login from './pages/Login';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import PrivateRoute from './components/PrivateRoute';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  }
}));

function App() {
  const classes = useStyles();

  return (
    <Router >
      <div className={classes.root}>
        <CssBaseline />
        <main>
          <Switch>
            <Route path="/login" component={Login}/>
            <PrivateRoute path="/detail/:numericCodeCountry" component={Detail}/>
            <PrivateRoute path="/" component={Main}/>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;

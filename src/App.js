import './App.css';
import Main from './pages/Main';
import Detail from './pages/Detail';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

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
            <Route path="/detail/:numericCodeCountry" component={Detail}/>
            <Route path="/" component={Main}/>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;

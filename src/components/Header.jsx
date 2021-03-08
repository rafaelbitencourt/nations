import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import {
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
  IconButton
} from '@material-ui/core';
import { Backspace } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { description, descriptionRight, goBackOption } = props;

  let history = useHistory();
  
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          { goBackOption ? (
            <Tooltip title="Voltar">
              <IconButton variant="contained" style={{color: "white"}} onClick={() => history.goBack()}>
                <Backspace />
              </IconButton>
            </Tooltip>
          ) : (
            <React.Fragment/>
          )}
          <Typography variant="h6" className={classes.title}>
            {description}
          </Typography>
          <Typography variant="h6">
            {descriptionRight}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
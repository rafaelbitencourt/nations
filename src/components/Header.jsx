import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AuthService } from 'services';
import { ConfirmDialog } from 'components/Dialog';

import {
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  Button
} from '@material-ui/core';
import { Backspace } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const { description, descriptionRight, goBackOption } = props;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const logado = !!AuthService.getToken();

  let history = useHistory();

  const sair = () => {
    AuthService.logout();
    history.push("/login");
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {goBackOption &&
            <Tooltip title="Voltar">
              <IconButton variant="contained" style={{ color: "white" }} onClick={() => history.goBack()}>
                <Backspace />
              </IconButton>
            </Tooltip>
          }
          <Typography variant="h6" className={classes.title}>
            {description}
          </Typography>
          <Typography variant="h6">
            {descriptionRight}
          </Typography>
          {logado &&
            <Button color="inherit" onClick={() => setConfirmOpen(true)}>Sair</Button>
          }
        </Toolbar>
      </AppBar>
      <ConfirmDialog
        titulo="Sair"
        mensagem="Tem certeza de que deseja sair?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={sair}
      />
    </div>
  );
}

export default Header;
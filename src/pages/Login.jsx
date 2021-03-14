
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { ErrorDialog } from '../components/Dialog';
import Header from '../components/Header';

import { 
    Box,
    Button, 
    TextField,
    Grid
} from '@material-ui/core';

export default function Detail() {
    const { register, errors, handleSubmit } = useForm();
    const [errorOpen, setErrorOpen] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");

    let history = useHistory();

    const cbSubmit = (inputs) => {
        AuthService.login(inputs.user.name, inputs.user.password)
            .then(
                (data) => {  
                    if(data){
                        history.replace('/');
                    } else {
                        setMensagemErro('Usuário e/ou senha inválido.');
                        setErrorOpen(true);
                    }
                },
                (error) => {
                    setMensagemErro(error.message || 'Ocorreu um erro ao fazer login.');
                    setErrorOpen(true);
                }
            );
    };

    return (
        <form>
            <Header description="Login" />
            <Box p={2} display="flex" flexDirection="column" alignItems="center">
                <Grid style={{maxWidth:500}} container spacing={2} >
                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <TextField 
                            label="Usuário"
                            name="user.name"
                            error={errors.user?.name ? true : false}
                            helperText={errors.user?.name ? errors.user.name.message : null } 
                            variant="outlined"
                            inputRef={register({
                                required: "Campo obrigatório",
                                maxLength: {
                                    value: 100,
                                    message: "Tamanho máximo: 100"
                                }
                            })}
                            InputLabelProps={{
                                shrink: true,
                            }} 
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <TextField 
                            label="Senha"
                            name="user.password"
                            type="password"
                            error={errors.user?.password ? true : false}
                            helperText={errors.user?.password ? errors.user.password.message : null } 
                            variant="outlined"
                            inputRef={register({
                                required: "Campo obrigatório",
                                maxLength: {
                                    value: 100,
                                    message: "Tamanho máximo: 100"
                                }
                            })}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleSubmit(cbSubmit)}
                            fullWidth={true}>
                            Entrar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <ErrorDialog
                mensagem={mensagemErro}
                open={errorOpen}
                setOpen={setErrorOpen}
            />
        </form>
    );
}
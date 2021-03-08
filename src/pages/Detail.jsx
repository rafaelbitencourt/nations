
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { saveCountry, removeCountry } from '../graphql/Mutations';
import { getCountry } from '../graphql/Queries';
import { SuccessDialog, ErrorDialog } from '../components/Dialog';
import Header from '../components/Header';

import { 
    Box,
    Button, 
    makeStyles,
    CircularProgress,
    TextField
} from '@material-ui/core';

const useStyles = makeStyles({
    carregando: {
        marginLeft: '50%',
        marginTop: '15rem'
    },
    img: {
        marginTop: '1rem',
        width: 480,
        height: 270
    },
    componentLeft: {
        marginRight: '0.5rem',
        width: '250px'
    },
    componentRight: {
        marginLeft: '0.5rem',
        width: '250px'
    }
});

export default function Detail() {
    const classes = useStyles();
    const { register, errors, handleSubmit, setValue } = useForm();
    const { numericCodeCountry } = useParams();
    const [country, setCountry] = useState(null);    
    const [errorOpen, setErrorOpen] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");
    const [sucessOpen, setSucessOpen] = useState(false);
    const [mensagemSucess, setMensagemSucess] = useState("");
    
    const recCountry = useCallback((numericCode) => {
        getCountry(numericCode, `
                _id
                numericCode
                name
                capital
                area
                population
                populationDensity
                flag {
                    svgFile
                }
                topLevelDomains{
                    name
                }
            `)
            .then(data => {
                setCountry(data);
                setValue('country', data);
            })
            .catch(resp => {
                alert('Ocorreu um erro ao buscar o país: ' + resp.message);
            });
    }, [setValue]);

    useEffect(() => {
        recCountry(numericCodeCountry);
    }, [numericCodeCountry, recCountry]);

    const cbSubmit = (inputs) => {
        saveCountry({ ...inputs.country, numericCode: numericCodeCountry})
            .then(
                (data) => {  
                    setCountry({...country, custom: true });     
                    setMensagemSucess("Customização salva com sucesso.");             
                    setSucessOpen(true);
                },
                (error) => {
                    setMensagemErro('Ocorreu um erro ao salvar a customização: ' + error.message);
                    setErrorOpen(true);
                }
            );
    };

    const removeCustom = () => {
        removeCountry(country)
            .then(
                (data) => { 
                    recCountry(numericCodeCountry);                                       
                    setMensagemSucess("Customização removida com sucesso.");
                    setSucessOpen(true);
                },
                (error) => {
                    setMensagemErro('Ocorreu um erro ao remover a customização: ' + error.message);
                    setErrorOpen(true);
                }
            );
    }

    if (!country) return (
        <>
            <Header goBackOption={true}/>
            <CircularProgress className={classes.carregando} />
        </>
    );

    return (
        <form>
            <Header 
                description={country.name} 
                descriptionRight={
                    Array.isArray(country.topLevelDomains) && country.topLevelDomains.length ?
                    `Top-Level Domain: ${country.topLevelDomains[0].name}` : ``
                }
                goBackOption={true}
            />
            <Box display="flex" flexDirection="column" alignItems="center">
                <img alt={country.name} src={country.flag.svgFile} className={classes.img}/>
                <Box mt={2} display="flex" flexDirection="row">
                    <TextField 
                        label="Capital"
                        name="country.capital"
                        error={errors.country && errors.country.capital ? true : false}
                        helperText={errors.country && errors.country.capital ? 
                            (errors.country.capital.message || "Tamanho máximo: 100") 
                            : null
                        } 
                        variant="outlined"
                        inputRef={register({
                            required: "Campo obrigatório",
                            maxLength: 100
                        })}
                        InputLabelProps={{
                            shrink: true,
                        }} 
                        className={classes.componentLeft}
                    />
                    <TextField 
                        label="Área"
                        name="country.area"
                        type="number"
                        error={errors.country && errors.country.area ? true : false}
                        helperText={errors.country && errors.country.area ? 
                            (errors.country.area.message || "Tamanho máximo: 20") 
                            : null
                        } 
                        variant="outlined"
                        inputRef={register({
                            required: "Campo obrigatório",
                            maxLength: 20
                        })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className={classes.componentRight} 
                    />
                </Box>
                <Box mt={2} display="flex" flexDirection="row">
                    <TextField 
                        label="População"
                        name="country.population"
                        type="number"
                        error={errors.country && errors.country.population ? true : false}
                        helperText={errors.country && errors.country.population ? 
                            (errors.country.population.message || "Tamanho máximo: 20") 
                            : null
                        } 
                        variant="outlined"
                        inputRef={register({
                            required: "Campo obrigatório",
                            maxLength: 20
                        })}
                        InputLabelProps={{
                            shrink: true,
                        }} 
                        className={classes.componentLeft} 
                    />
                    <TextField 
                        label="Densidade Populacional"
                        name="country.populationDensity"
                        type="number"
                        error={errors.country && errors.country.populationDensity ? true : false}
                        helperText={errors.country && errors.country.populationDensity ? 
                            (errors.country.populationDensity.message || "Tamanho máximo: 20") 
                            : null
                        } 
                        variant="outlined"
                        inputRef={register({
                            required: "Campo obrigatório",
                            maxLength: 20
                        })}
                        InputLabelProps={{
                            shrink: true,
                        }} 
                        className={classes.componentRight} 
                    />
                </Box>
                <Box mt={2} display="flex" flexDirection="row">
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleSubmit(cbSubmit)}
                        className={classes.componentLeft}>
                        Salvar customização
                    </Button>
                    <Button 
                        disabled={!country.custom}
                        variant="contained" 
                        color="secondary" 
                        onClick={removeCustom}
                        className={classes.componentRight}>
                        Remover customização
                    </Button>
                </Box>
            </Box>
            <SuccessDialog
                mensagem={mensagemSucess}
                open={sucessOpen}
                setOpen={setSucessOpen}
            />
            <ErrorDialog
                mensagem={mensagemErro}
                open={errorOpen}
                setOpen={setErrorOpen}
            />
        </form>
    );
}
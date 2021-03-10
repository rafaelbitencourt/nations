
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { saveCountry, removeCountry } from '../graphql/Mutations';
import { getCountry } from '../graphql/Queries';
import { SuccessDialog, ErrorDialog } from '../components/Dialog';
import Header from '../components/Header';
import Image from 'material-ui-image';

import { 
    Box,
    Button, 
    TextField,
    Grid
} from '@material-ui/core';

export default function Detail() {
    const { register, errors, handleSubmit, setValue, reset } = useForm();
    const { numericCodeCountry } = useParams();
    const [country, setCountry] = useState({
        flag: {
            svgFile: null
        },
        topLevelDomains: [{ 
            name: null 
        }]
    });    
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
                reset();
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
            <Box p={2} display="flex" flexDirection="column" alignItems="center">
                <Grid style={{maxWidth:600}} container spacing={2} >
                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <Image
                            aspectRatio={(16/10)}
                            src={country.flag.svgFile} 
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12} >
                        <TextField 
                            label="Capital"
                            name="country.capital"
                            error={errors.country?.capital ? true : false}
                            helperText={errors.country?.capital ? errors.country.capital.message : null } 
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
                    <Grid item lg={6} md={6} sm={6} xs={12} >
                        <TextField 
                            label="Área"
                            name="country.area"
                            type="number"
                            error={errors.country?.area ? true : false}
                            helperText={errors.country?.area ? errors.country.area.message : null } 
                            variant="outlined"
                            inputRef={register({
                                required: "Campo obrigatório",
                                min: {
                                    value: 0,
                                    message: "Valor mínimo: 0"
                                },
                                max: {
                                    value: 9999999999,
                                    message: "Valor máximo: 9999999999"
                                }
                            })}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12} >
                        <TextField 
                            label="População"
                            name="country.population"
                            type="number"
                            error={errors.country?.population ? true : false}
                            helperText={errors.country?.population ? errors.country.population.message : null } 
                            variant="outlined"
                            inputRef={register({
                                required: "Campo obrigatório",
                                min: {
                                    value: 0,
                                    message: "Valor mínimo: 0"
                                },
                                max: {
                                    value: 9999999999,
                                    message: "Valor máximo: 9999999999"
                                }
                            })}
                            InputLabelProps={{
                                shrink: true,
                            }} 
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12} >
                        <TextField 
                            label="Densidade Populacional"
                            name="country.populationDensity"
                            type="number"
                            error={errors.country?.populationDensity ? true : false}
                            helperText={errors.country?.populationDensity ? errors.country.populationDensity.message : null } 
                            variant="outlined"
                            inputRef={register({
                                required: "Campo obrigatório",
                                min: {
                                    value: 0,
                                    message: "Valor mínimo: 0"
                                },
                                max: {
                                    value: 9999999999,
                                    message: "Valor máximo: 9999999999"
                                }
                            })}
                            InputLabelProps={{
                                shrink: true,
                            }} 
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12} >
                        <Button 
                            disabled={!country.numericCode}
                            variant="contained" 
                            color="primary" 
                            onClick={handleSubmit(cbSubmit)}
                            fullWidth={true}>
                            Salvar customização
                        </Button>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12} >
                        <Button 
                            disabled={!country.custom}
                            variant="contained" 
                            color="secondary" 
                            onClick={removeCustom}
                            fullWidth={true}>
                            Remover customização
                        </Button>
                    </Grid>
                </Grid>
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
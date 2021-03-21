import React, { useState, useEffect } from 'react';
import { listCountries, countCountries } from '../graphql/Queries';
import ImgMediaCard from '../components/Cards';
import Header from '../components/Header';
import { useForm } from 'react-hook-form';

import {
    Box,
    Grid,
    makeStyles,
    TextField,
    TablePagination,
    Button,
    CircularProgress,
    Container
} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        maxHeight: '100vh',
    },
    containerGrid:{
        flex: 1, 
        overflow: 'auto'
    },    
    fieldSearch: {
        flex: 1,
        maxWidth: 450,
        marginRight: '1rem'
    },
    carregando: {
        display: 'flex',
        flexDirection: 'column',
        height: '70vh',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tablePagination: {
        position: "fixed",
        bottom: 0,
        width: '100%',
        backgroundColor: "white"
    },
});

export default function Main() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsTotal, setRowsTotal] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(12);
    const [filters, setFilters] = useState(`{}`);
    const classes = useStyles();
    const { register, errors, handleSubmit } = useForm();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const onClickPesquisar = (inputs) => {
        setPage(0);

        if(inputs.filtro.name)
            setFilters(`{name_contains:"${inputs.filtro.name}"}`)
        else
            setFilters(`{}`)
    }

    useEffect(() => {
        countCountries(filters)
            .then(data => {
                setRowsTotal(data);
            })
            .catch(resp => {
                alert('Ocorreu um erro ao contar os países: ' + resp.message);
            });
    }, [filters]);

    useEffect(() => {
        setLoading(true);
        listCountries(page * rowsPerPage, rowsPerPage, `
                 ${filters}
                `, `
                _id
                numericCode
                name
                capital
                flag {
                    svgFile
                }
            `)
            .then(data => {
                setLoading(false);
                setCountries(data);
            })
            .catch(resp => {
                setLoading(false);
                alert('Ocorreu um erro ao buscar os países: ' + resp.message);
            });
    }, [rowsPerPage, page, filters]);

    return (
        <Box className={classes.root} display="flex" flexDirection="column">
            <Header description="Nações"/>
            <Box my={2} px={2} display="flex" justifyContent="center" alignItems="center">
                <TextField
                    placeholder="Pesquisar pelo nome do país"
                    name="filtro.name"
                    variant="outlined"
                    error={errors.filtro && errors.filtro.name ? true : false}
                    helperText={errors.filtro && errors.filtro.name ? errors.filtro.name.message : null} 
                    inputRef={register({
                        maxLength: 100
                    })}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className={classes.fieldSearch}
                />
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit(onClickPesquisar)}>
                    Pesquisar
                </Button>
            </Box>
            {loading ? (
                <Box className={classes.carregando}>
                    <CircularProgress/>
                </Box>
            ) : (
                <Container style={{flex: 1, overflow: 'auto', marginBottom: '50px'}}>
                    <Grid container spacing={4} >   
                        {countries.map(country => (
                            <Grid key={country.numericCode} item lg={3} md={4} sm={6} xs={12}>
                                <ImgMediaCard
                                    country={country}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            )}
            <Box display="flex" justifyContent="center" className={classes.tablePagination}>
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[12, 24, 48, 96]}
                    labelRowsPerPage="Na página"
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                    count={rowsTotal}
                    page={page}
                    onChangePage={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Box>
        </Box>
    );
}
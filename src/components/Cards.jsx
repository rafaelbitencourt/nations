import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Warning } from '@material-ui/icons';
import { Link } from "react-router-dom";
import { Box } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        minHeight: 260
    },
    media: {
        height: 140
    },
    content: {
        height: '3.5rem',
        flex: 1
    },
    description: {
        flex: 1
    }
});

export default function ImgMediaCard(props) {
    const classes = useStyles();
    const { country } = props;

    return (
        <Paper className={classes.root} >
            <Card component={Link} to={`/detail/${country.numericCode}`}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        component="img"
                        alt={country.name}
                        image={country.flag.svgFile}
                        title={country.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" className={classes.content}>
                            {country.name}
                        </Typography>
                        <Box display="flex">
                            <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                                {country.capital}
                            </Typography>
                            {country.custom ? (
                                <Box display="flex" alignItems="right">
                                    <Tooltip title="Informações customizadas">
                                        <Warning style={{ color: '#fb8c00' }} />
                                    </Tooltip>
                                </Box>
                            ) : (
                                <React.Fragment/>
                            )}
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Paper>
    );
}
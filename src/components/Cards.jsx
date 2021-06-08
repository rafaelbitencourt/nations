import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Warning } from '@material-ui/icons';
import { Link } from "react-router-dom";
import { Box } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Image from 'material-ui-image';

const useStyles = makeStyles({
    content: {
        height: '3.5rem',
        flex: 1
    },
    description: {
        flex: 1
    }
});

const ImgMediaCard = (props) => {
    const classes = useStyles();
    const { country } = props;

    return (
        <Paper p={1}>
            <Card component={Link} to={`/detail/${country.numericCode}`}>
                <CardActionArea>
                    <Image
                        aspectRatio={(16 / 10)}
                        src={country.flag.svgFile}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" className={classes.content}>
                            {country.name}
                        </Typography>
                        <Box display="flex">
                            <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                                {country.capital}
                            </Typography>
                            {country.custom &&
                                <Box display="flex" alignItems="right">
                                    <Tooltip title="Informações customizadas">
                                        <Warning style={{ color: '#fb8c00' }} />
                                    </Tooltip>
                                </Box>
                            }
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Paper>
    );
}

export default ImgMediaCard;
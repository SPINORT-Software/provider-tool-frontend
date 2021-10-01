import React from 'react';

// material-ui
import { CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField, Card, Switch, Typography} from '@material-ui/core';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import MaskedInput from 'react-text-mask';

import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark[800] : theme.palette.primary.light,
        marginBottom: '16px',
        marginTop: '16px'
    }
}));

const CaseManagementDecision = () => {
    const classes = useStyles();

    const [sdm, setSdm] = React.useState(true);
    const [notification, setNotification] = React.useState(false);

    return (
        <Card className={classes.card} title='Client Case Management Decision'>

            <CardContent>
                <Grid container spacing={3} direction="column">
                    <Grid item xs={8} sm={8} lg={6} md={8}>
                        <Grid item container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="subtitle1">Client is accepted in the Case Management Program</Typography>
                            </Grid>
                            <Grid item>
                                <Switch size="small" color="primary" checked={sdm} onChange={(e) => setSdm(e.target.checked)} name="sdm" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default CaseManagementDecision;

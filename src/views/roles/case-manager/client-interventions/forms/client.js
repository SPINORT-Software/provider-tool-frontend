import React from 'react';

// material-ui
import {
    CardContent,
    FormControl,
    FormControlLabel,
    Grid,
    MenuItem,
    TextField,
    Radio,
    RadioGroup
} from '@material-ui/core';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';

const ClientSelect = () => {
    const [valueLabel, setValueLabel] = React.useState('checked');

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={12} lg={8} md={8}>
                <TextField type='text' fullWidth label='Client' defaultValue='' />
            </Grid>
        </Grid>
    );
};

export default ClientSelect;

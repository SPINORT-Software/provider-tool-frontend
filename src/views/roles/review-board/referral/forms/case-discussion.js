import React from 'react';

// material-ui
import { CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField } from '@material-ui/core';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import MaskedInput from 'react-text-mask';

const ReferralSource = () => (
    <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={12} lg={8} md={8}>
            Case Discussion

        </Grid>
    </Grid>
);

export default ReferralSource;

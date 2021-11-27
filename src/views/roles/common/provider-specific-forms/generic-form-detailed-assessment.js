import React from 'react';

// material-ui
import {CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';


const ProviderGenericForm = () => (
    <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={12} lg={12} md={12}>
            <SubCard title='Generic Form Detailed Assessment'>
                <CardContent>
                    <Grid container spacing={gridSpacing}>

                        Display the form file name based on the PROVIDER_TYPE value in props

                    </Grid>
                </CardContent>
            </SubCard>
        </Grid>
    </Grid>
);

export default ProviderGenericForm;

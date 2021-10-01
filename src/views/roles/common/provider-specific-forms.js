import React from 'react';

// material-ui
import { CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField } from '@material-ui/core';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';

const ProviderSpecificForms = () => (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={12} lg={12} md={12}>
                <SubCard title='Provider Specific Assessment Forms'>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>

                            <Grid item xs={12} sm={8}>
                                <TextField fullWidth label='Total time spent' defaultValue='' />
                            </Grid>
                        </Grid>
                    </CardContent>
                </SubCard>
            </Grid>
        </Grid>
    );

export default ProviderSpecificForms;

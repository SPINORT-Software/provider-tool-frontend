import React from 'react';

// material-ui
import { CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField } from '@material-ui/core';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import MaskedInput from 'react-text-mask';

const ClientDetail = () => (
    <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={12} lg={12} md={12}>
            <SubCard title='Client Details'>
                <CardContent>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={8} sm={10} lg={10} md={10}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={6} sm={8} lg={6} md={8}>
                                    <TextField fullWidth label='First Name' defaultValue='' />
                                </Grid>
                                <Grid item xs={6} sm={8} lg={6} md={8}>
                                    <TextField fullWidth label='Last Name' defaultValue='' />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={8} sm={8} lg={8} md={8}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={12} lg={8} md={8}>
                                    <TextField fullWidth label='Email' defaultValue='' />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </SubCard>
        </Grid>
    </Grid>
);

export default ClientDetail;

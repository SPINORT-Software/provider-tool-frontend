import React from 'react';

// material-ui
import { CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField } from '@material-ui/core';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import MaskedInput from 'react-text-mask';

const ReferralForms = () => (
    <SubCard>
        <CardContent>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={12} lg={8} md={8}>
                    Referral Forms


                    EMP Referral Request (Linked with user Dashboards BUT NOT CLIENT)

                    Familiar Faces - Social Needs Assessment Tool (Linked with users Dashboards BUT NOT CLIENT)

                    Familiar Faces – Screening Tool: Social Determinants of Health (Linked with (Linked with users Dashboards BUT NOT CLIENT)
                </Grid>
            </Grid>
        </CardContent>
    </SubCard>
);

export default ReferralForms;

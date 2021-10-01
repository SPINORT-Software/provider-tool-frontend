import React from 'react';

// material-ui
import { CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField } from '@material-ui/core';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import MaskedInput from 'react-text-mask';
import FileInput from '../../../common/file-input';

const ReferralForms = () => (
    <SubCard title='Referral Forms'>
        <CardContent>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={12} lg={12} md={12}>
                    <Grid container spacing={gridSpacing}>
                        <FileInput title='EMP Referral Request' />

                        <FileInput title='Familiar Faces - Social Needs Assessment Tool' />

                        <FileInput title='Familiar Faces - Screening Tool: Social Determinants of Health' />
                    </Grid>

                </Grid>
            </Grid>
        </CardContent>
    </SubCard>
);

export default ReferralForms;

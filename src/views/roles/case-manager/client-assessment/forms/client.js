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

            <Grid item xs={12} md={8}>
                <SubCard title='New Case Management Client (Active)'>
                    <Grid container spacing={12}>
                        <Grid item xs={12} sm={12} lg={8} md={8}>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-label='client-status'
                                    value={valueLabel}
                                    onChange={(e) => setValueLabel(e.target.value)}
                                    name='row-radio-buttons-group'
                                >
                                    <FormControlLabel value='existing-extra-mural-no-reassess' control={<Radio />}
                                                      label='Existing Extra-Mural Client – No need to re-assess ' />
                                    <FormControlLabel value='existing-extra-mural-reassess' control={<Radio />}
                                                      label='Existing Extra-Mural Client - Need to re-assess' />
                                    <FormControlLabel value='new-extra-mural' control={<Radio />}
                                                      label='New Extra-Mural Client' />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>

            <Grid item xs={12} md={8}>
                <SubCard title='Existing Case Management Client'>
                    <Grid container spacing={12}>
                        <Grid item xs={12} sm={12} lg={8} md={8}>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-label='client-status'
                                    value={valueLabel}
                                    onChange={(e) => setValueLabel(e.target.value)}
                                    name='row-radio-buttons-group'
                                >
                                    <FormControlLabel value='existing-casemanagement-client-reassess' control={<Radio />}
                                                      label='Need to re-assess' />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default ClientSelect;

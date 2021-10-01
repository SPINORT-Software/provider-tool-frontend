import React from 'react';

// material-ui
import { CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField } from '@material-ui/core';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import MaskedInput from 'react-text-mask';

const Details = () => {
    const [state1, setState1] = React.useState({
        checkedA: true
    });

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={12} lg={6} md={6}>
                <MaskedInput
                    mask={[/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                    className="form-control"
                    label="Date"
                    guide={false}
                    id="daily-workload-date"
                    onBlur={() => {}}
                    onChange={() => {}}
                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props} defaultValue="" />}
                />
            </Grid>

            <Grid item xs={8} sm={8} lg={8} md={8}>
                <SubCard title='Time Spent'>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={8} sm={8} lg={8} md={8}>
                                <MaskedInput
                                    mask={[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]}
                                    className="form-control"
                                    label="Service Recipient Travel"
                                    guide={false}
                                    id="workload-service-recipient-travel-time-spent"
                                    onBlur={() => {}}
                                    onChange={() => {}}
                                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props} defaultValue="" />}
                                />

                            </Grid>
                            <Grid item xs={8} sm={8} lg={8} md={8}>
                                <MaskedInput
                                    mask={[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]}
                                    className="form-control"
                                    label="Functional Center"
                                    guide={false}
                                    id="workload-functional-center-time-spent"
                                    onBlur={() => {}}
                                    onChange={() => {}}
                                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props} defaultValue="" />}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </SubCard>
            </Grid>


        </Grid>
    );
};

export default Details;

import React from 'react';

// material-ui
import { CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField } from '@material-ui/core';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import MaskedInput from 'react-text-mask';

const ClientCaseload = () => {
    const [state1, setState1] = React.useState({
        checkedA: true
    });
    const handleChangeState1 = (event) => {
        setState1({ ...state1, [event.target.name]: event.target.checked });
    };
    return (
        <Grid container spacing={gridSpacing}>

            <Grid item xs={12} sm={8}>
                <SubCard title='Case Management Clients'>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={8}>
                                <TextField type='number' fullWidth label='Number of Case Management Clients'
                                           defaultValue='' />
                            </Grid>

                            <Grid item xs={12} sm={8}>
                                <MaskedInput
                                    mask={[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]}
                                    className="form-control"
                                    label="Total time spent"
                                    guide={false}
                                    id="case-management-clients-time-spent"
                                    onBlur={() => {}}
                                    onChange={() => {}}
                                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props} defaultValue="" />}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </SubCard>
            </Grid>

            <Grid item xs={12} sm={8}>
                <SubCard title='Regular Clients'>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={8}>
                                <TextField type='number' fullWidth label='Number of Regular Clients' defaultValue='' />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <MaskedInput
                                    mask={[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]}
                                    className="form-control"
                                    label="Total time spent"
                                    guide={false}
                                    id="regular-clients-time-spent"
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

export default ClientCaseload;

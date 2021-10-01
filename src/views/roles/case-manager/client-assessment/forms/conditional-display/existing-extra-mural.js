import React from 'react';

// material-ui
import { CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField } from '@material-ui/core';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import MaskedInput from 'react-text-mask';

const ExistingExtraMural = () => {
    const [city, setCity] = React.useState('1');
    const handleChangeCity = (event) => {
        setCity(event.target.value);
    };

    const [Country, setCountry] = React.useState('1');
    const handleSelectChange1 = (event) => {
        setCountry(event.target.value);
    };

    const [state1, setState1] = React.useState({
        checkedA: true
    });
    const handleChangeState1 = (event) => {
        setState1({ ...state1, [event.target.name]: event.target.checked });
    };
    return (
        <Grid container spacing={gridSpacing}>

            <Grid item xs={12} sm={12} lg={6} md={6}>
                <MaskedInput
                    mask={[/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                    className="form-control"
                    label="Date"
                    guide={false}
                    id="existing-extra-mural-assessment-date"
                    onBlur={() => {}}
                    onChange={() => {}}
                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props} defaultValue="" />}
                />

            </Grid>

            <Grid item xs={12} sm={8}>
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

            <Grid item xs={12} sm={8}>
                <SubCard title='Assessment Forms'>
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
};

export default ExistingExtraMural;

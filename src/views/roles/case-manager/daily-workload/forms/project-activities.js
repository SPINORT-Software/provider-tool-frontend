import React from 'react';

// material-ui
import { Checkbox, CardContent, FormControlLabel, Grid, MenuItem, TextField } from '@material-ui/core';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';


const ProjectActivities = () => {
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
            <Grid item xs={12} sm={6}>

                <SubCard title='Research Meetings'>
                    <CardContent>
                        <TextField fullWidth label='Total time spent' defaultValue='' />
                    </CardContent>
                </SubCard>

            </Grid>

            <Grid item xs={12} sm={6}>

                <SubCard title='Administration (e.g., data gathering, sharing institutional documents, etc.)'>
                    <CardContent>
                        <TextField fullWidth label='Total time spent' defaultValue='' />
                    </CardContent>
                </SubCard>

            </Grid>

            <Grid item xs={12} sm={6}>

                <SubCard title='Other'>
                    <CardContent>
                        <TextField fullWidth label='Other' defaultValue='' />
                    </CardContent>
                </SubCard>

            </Grid>
        </Grid>
    );
};

export default ProjectActivities;

import React from 'react';

// material-ui
import { CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField } from '@material-ui/core';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import AssessmentForms from '../../../common/assessment-forms';
import TypeOfClinicalInterventions from './type-clinical-interventions';
import TypeOfTherapeuticInterventions from './type-therapeutic-intervention';
import MaskedInput from 'react-text-mask';
import FileInput from '../../../common/file-input';

const modeOfInterventionSelectList = [
    {
        value: 'in-person-home',
        label: 'In-Person Visit - Home'
    },
    {
        value: 'in-person-nursing-home',
        label: 'In-Person Visit - Nursing Home '
    },
    {
        value: 'in-person-residential-facility',
        label: 'In-Person Visit - Residential Facility '
    },
    {
        value: 'in-person-work',
        label: 'In-Person Visit - Work'
    },
    {
        value: 'in-person-other',
        label: 'In-Person Visit - Other'
    },
    {
        value: 'telephone',
        label: 'Telephone'
    },
    {
        value: 'videoconferencing',
        label: 'Videoconferencing'
    },
    {
        value: 'other',
        label: 'Other'
    }
];

const InterventionDetails = () => {
    const [city, setCity] = React.useState('1');
    const handleChangeCity = (event) => {
        setCity(event.target.value);
    };

    return (
        <Grid container spacing={gridSpacing}>

            <Grid item xs={12} sm={12} lg={8} md={8}>
                <MaskedInput
                    mask={[/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                    className='form-control'
                    label='Date'
                    guide={false}
                    id='client-intervention-date'
                    onBlur={() => {
                    }}
                    onChange={() => {
                    }}
                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props} defaultValue='' />}
                />
            </Grid>

            <Grid item xs={12} sm={12} lg={8} md={8}>
                <MaskedInput
                    mask={[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]}
                    className='form-control'
                    label='Total time spent'
                    guide={false}
                    id='client-intervention-time-spent'
                    onBlur={() => {
                    }}
                    onChange={() => {
                    }}
                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props} defaultValue='' />}
                />

            </Grid>


            <Grid item xs={12} sm={12} lg={8} md={8}>
                <SubCard title='Mode of Clinical Intervention'>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={8}>
                                <TextField id='client-intervention-mode-of-assessment' select label='Mode of Clinical Intervention'
                                           value={city} fullWidth onChange={handleChangeCity}>
                                    {modeOfInterventionSelectList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sm={8}>
                                <TextField id='client-reassessment-mode-of-assessment-other' type='text' fullWidth label='Other'
                                           defaultValue='' />
                            </Grid>
                        </Grid>
                    </CardContent>
                </SubCard>
            </Grid>

            <Grid item xs={12} sm={8}>
                <TypeOfTherapeuticInterventions />
            </Grid>

            <Grid item xs={12} sm={8}>
                <SubCard title='Assessment Forms'>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <FileInput title='EMP Progress Notes' />

                            <FileInput title='Team Communication' />
                        </Grid>
                    </CardContent>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default InterventionDetails;

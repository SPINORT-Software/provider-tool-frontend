import React from 'react';

// material-ui
import { CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField } from '@material-ui/core';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import ProviderSpecificForms from '../../../../common/provider-specific-forms';
import AssessmentForms from '../../../../common/assessment-forms';
import MaskedInput from 'react-text-mask';

const modeOfAssessmentSelectList = [
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

const NewExtraMural = () => {
    const [city, setCity] = React.useState('1');
    const handleChangeCity = (event) => {
        setCity(event.target.value);
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
                    id="new-extra-mural-assessment-date"
                    onBlur={() => {}}
                    onChange={() => {}}
                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props} defaultValue="" />}
                />
            </Grid>

            <Grid item xs={12} sm={12} lg={8} md={8}>
                <MaskedInput
                    mask={[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]}
                    className="form-control"
                    label="Total time spent"
                    guide={false}
                    id="new-extra-mural-time-spent"
                    onBlur={() => {}}
                    onChange={() => {}}
                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props} defaultValue="" />}
                />
            </Grid>

            <Grid item xs={12} sm={8}>
                <TextField id="new-extra-mural-mode-of-assessment" select label="Mode of Assessment" value={city} fullWidth onChange={handleChangeCity}>
                    {modeOfAssessmentSelectList.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>

            <Grid item xs={12} sm={12} lg={8} md={8}>
                <TextField id='new-extra-mural-mode-of-assessment-other' type='text' fullWidth label='Other' defaultValue='' />
            </Grid>

            <Grid item xs={12} sm={8}>
                <ProviderSpecificForms />
            </Grid>

            <Grid item xs={12} sm={8}>
                <AssessmentForms />
            </Grid>

        </Grid>
    );
};

export default NewExtraMural;

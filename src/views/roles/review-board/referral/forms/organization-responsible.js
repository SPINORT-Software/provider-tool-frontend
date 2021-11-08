import React from 'react';

// material-ui
import {  Autocomplete, Paper, InputAdornment, CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField } from '@material-ui/core';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import MaskedInput from 'react-text-mask';

// assets
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';

const referralSourcesList = [
    { label: 'Ability NB', id: 1 },
    { label: 'Addic', id: 2 },
    { label: 'Ambulance New Brunswick (ANB)', id: 3 },
    { label: 'Community Health Centers', id: 4 },
    { label: 'Specify: Nurse Practitioner or Family Physician', id: 5 },
    { label: 'Department of Veteran Affairs', id: 6 },
    { label: 'Emergency Department', id: 7 },
    { label: 'Extra-Mural Program', id: 8 },
    { label: 'Family Physician (Outside Community Health Centers)', id: 9 },
    { label: 'First Nations', id: 10 },
    { label: 'Homecare Agency', id: 11 },
    { label: 'Hospital (Inpatient)', id: 12 },
    { label: 'Nursing Home', id: 13 },
    { label: 'Public Health Services', id: 14 },
    { label: 'Residential Facility', id: 15 },
    { label: 'Self-referral or Referral by Family Member', id: 16 },
    { label: 'Social Development - Home Adaptations for Seniors Independence Program', id: 17 },
    { label: 'Social Development - Homeowner Repair Program', id: 18 },
    { label: 'Social Development - Housing Program', id: 19 },
    { label: 'Social Development - Long-Term Care Program', id: 20 },
    { label: 'Social Development - Mobility and Adaptive Equipment Loan Program', id: 21 },
    { label: 'Social Development - Social Assistance Program', id: 21 },
    { label: 'Volunteer Organizations', id: 22 },
    { label: 'Other', id: 23 }
];

const OrganizationResponsible = ({name, id, formik}) => {
    const handleChange = (e, value) => {
        const {id, label} = value;
        formik.setFieldValue(name, id)
    }

    return <SubCard title='Organization responsible for Client Case Management'>
        <CardContent>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={12} lg={12} md={12}>
                    <Autocomplete
                        disablePortal
                        options={referralSourcesList}
                        defaultValue={referralSourcesList[0]}
                        name={name}
                        id={id}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} label="Organization"/>}
                    />
                </Grid>
            </Grid>
        </CardContent>
    </SubCard>
};

export default OrganizationResponsible;

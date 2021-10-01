import React from 'react';

// material-ui
import { Autocomplete, CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField } from '@material-ui/core';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import MaskedInput from 'react-text-mask';

import ReferralForms from './referral-forms';
import ReferralSource from './referral-source';
import CasePresentationForm from './case-presentation-form';

const referralSourcesList = [
    { label: 'Ability NB', id: 1 },
    { label: 'Ambulatory Clinic (Outpatient)', id: 2 },
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

const caseDiscussionMembersPresentList = [
    { label: 'Ability NB', id: 1 },
    { label: 'Addiction and Mental Health', id: 2 },
    { label: 'Ambulance NB', id: 3 },
    { label: 'CCC Liaison Nurse', id: 4 },
    { label: 'Community Pharmacist', id: 5 },
    { label: 'Extra-Mural Program - Lead Nurse Case Manager', id: 6 },
    { label: 'Extra-Mural Program - Nutritionist', id: 7 },
    { label: 'Extra-Mural Program - Occupational Therapist', id: 8 },
    { label: 'Extra-Mural Program - Physical Therapist', id: 9 },
    { label: 'Extra-Mural Program - Registered Nurse', id: 10 },
    { label: 'Extra-Mural Program - Respiratory Therapist', id: 11 },
    { label: 'Extra-Mural Program - Social Worker', id: 12 },
    { label: 'Extra-Mural Program - Speech & Language Therapist', id: 13 },
    { label: 'Extra-Mural Program - Other', id: 14 },
    { label: 'Family physician', id: 15 },
    { label: 'First Nations - First Nations Case Manager', id: 16 },
    { label: 'Horizon Health Network', id: 17 },
    { label: 'Nurse Practitioner', id: 18 },
    { label: 'Social Development - Home Adaptations for Seniors Independence Program', id: 19 },
    { label: 'Social Development - Homeowner Repair Program', id: 20 },
    { label: 'Social Development - Housing Program', id: 21 },
    { label: 'Social Development - Long-Term Care Program', id: 22 },
    { label: 'Social Development - Mobility and Adaptive Equipment Loan Program', id: 23 },
    { label: 'Social Development - Social Assistance Program', id: 24 },
    { label: 'Social Development - Other', id: 25 },
    { label: 'Others', id: 26 }
];

const ReviewReferralDetails = () => {
    const [city, setCity] = React.useState('1');
    const handleChangeCity = (event) => {
        setCity(event.target.value);
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={8} lg={4}>
                <MaskedInput
                    mask={[/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                    className='form-control'
                    label='Date of Referral'
                    guide={false}
                    id='client-referral-date'
                    onBlur={() => {
                    }}
                    onChange={() => {
                    }}
                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props} defaultValue='' />}
                />
            </Grid>

            <Grid item xs={12} md={8} lg={4}>
                <MaskedInput
                    mask={[/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                    className='form-control'
                    label='Date of Case Discussion'
                    guide={false}
                    id='client-referral-case-discussion-date'
                    onBlur={() => {
                    }}
                    onChange={() => {
                    }}
                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props} defaultValue='' />}
                />
            </Grid>

            <Grid item xs={12} md={8} lg={10}>
                <ReferralForms />
            </Grid>

            <Grid item xs={12} md={8} lg={10}>
                <ReferralSource />
            </Grid>



            <Grid item xs={12} md={8} lg={10}>
                <CasePresentationForm />
            </Grid>

            <Grid item xs={12} sm={10} lg={10}>
                <SubCard title='Organizations Involved Upon Referral'>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <Autocomplete
                                    multiple
                                    options={referralSourcesList}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} />}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            pr: '30px !important'
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </SubCard>
            </Grid>

            <Grid item xs={12} sm={10} lg={10}>
                <SubCard title='Members Present for Case Discussion'>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <Autocomplete
                                    multiple
                                    options={caseDiscussionMembersPresentList}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} />}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            pr: '30px !important'
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </SubCard>
            </Grid>


        </Grid>
    );
};

export default ReviewReferralDetails;

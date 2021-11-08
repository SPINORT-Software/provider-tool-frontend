import React from 'react';

// material-ui
import {
    Autocomplete,
    Paper,
    InputAdornment,
    CardContent,
    Checkbox,
    FormControlLabel,
    Grid,
    MenuItem,
    TextField
} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import MaskedInput from 'react-text-mask';

// assets
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';

const referralSourcesList = [
    {label: 'Ability NB', id: 'referral_source_ability_nb'},
    {label: 'Ambulatory Clinic (Outpatient)', id: 'referral_source_ambulatory_clinic_outpatient'},
    {label: 'Ambulance New Brunswick (ANB)', id: 'referral_source_anb'},
    {label: 'Community Health Centers', id: 'referral_source_community_health_centers'},
    {label: 'Specify: Nurse Practitioner or Family Physician', id: 'referral_source_nurse_practitioner_family_physician'},
    {label: 'Department of Veteran Affairs', id: 'referral_source_department_of_veteran_affairs'},
    {label: 'Emergency Department', id: 'referral_source_emergency_department'},
    {label: 'Extra-Mural Program', id: 'referral_source_extra_mural_program'},
    {label: 'Family Physician (Outside Community Health Centers)', id: 'referral_source_family_physician_outside'},
    {label: 'First Nations', id: 'referral_source_first_nations'},
    {label: 'Homecare Agency', id: 'referral_source_homecare_agency'},
    {label: 'Hospital (Inpatient)', id: 'referral_source_hospital_inpatient'},
    {label: 'Nursing Home', id: 'referral_source_nursing_home'},
    {label: 'Public Health Services', id: 'referral_source_public_health_services'},
    {label: 'Residential Facility', id: 'referral_source_residential_facility'},
    {label: 'Self-referral or Referral by Family Member', id: 'referral_source_self_referral'},
    {label: 'Social Development - Home Adaptations for Seniors Independence Program', id: 'referral_source_social_home_adaptations'},
    {label: 'Social Development - Homeowner Repair Program', id: 'referral_source_social_homeowner_repair'},
    {label: 'Social Development - Housing Program', id: 'referral_source_social_housing_program'},
    {label: 'Social Development - Long-Term Care Program', id: 'referral_source_social_long_term_care'},
    {label: 'Social Development - Mobility and Adaptive Equipment Loan Program', id: 'referral_source_social_mobility_loan'},
    {label: 'Social Development - Social Assistance Program', id: 'referral_source_social_assistance'},
    {label: 'Volunteer Organizations', id: 'referral_source_volunter_organizations'},
    {label: 'Other', id: 'referral_source_other'}
];

const ReferralSource = ({name, id, formik}) => {
    const handleChange = (e, value) => {
        const {id, label} = value;
        formik.setFieldValue("referralSource", id)
    }

    return <SubCard title='Source of Referral'>
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
                        renderInput={(params) => <TextField {...params} label="Referral Source"/>}
                    />
                </Grid>
            </Grid>
        </CardContent>
    </SubCard>
};

export default ReferralSource;

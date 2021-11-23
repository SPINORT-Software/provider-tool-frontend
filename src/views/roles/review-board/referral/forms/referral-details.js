import React from 'react';

// material-ui
import {
    Autocomplete,
    Button,
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

import CasePresentationForm from './case-presentation-form';
import OrganizationResponsible from './organization-responsible';
import {setReferralDetails} from "store/actions/reviewBoard/referralActions";
import {connect, useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";


const organizationResponsible = [
    {label: 'Ability NB', id: 1},
    {label: 'Addic', id: 2},
    {label: 'Ambulance New Brunswick (ANB)', id: 3},
    {label: 'Community Health Centers', id: 4},
    {label: 'Specify: Nurse Practitioner or Family Physician', id: 5},
    {label: 'Department of Veteran Affairs', id: 6},
    {label: 'Emergency Department', id: 7},
    {label: 'Extra-Mural Program', id: 8},
    {label: 'Family Physician (Outside Community Health Centers)', id: 9},
    {label: 'First Nations', id: 10},
    {label: 'Homecare Agency', id: 11},
    {label: 'Hospital (Inpatient)', id: 12},
    {label: 'Nursing Home', id: 13},
    {label: 'Public Health Services', id: 14},
    {label: 'Residential Facility', id: 15},
    {label: 'Self-referral or Referral by Family Member', id: 16},
    {label: 'Social Development - Home Adaptations for Seniors Independence Program', id: 17},
    {label: 'Social Development - Homeowner Repair Program', id: 18},
    {label: 'Social Development - Housing Program', id: 19},
    {label: 'Social Development - Long-Term Care Program', id: 20},
    {label: 'Social Development - Mobility and Adaptive Equipment Loan Program', id: 21},
    {label: 'Social Development - Social Assistance Program', id: 21},
    {label: 'Volunteer Organizations', id: 22},
    {label: 'Other', id: 23}
];

const referralSourcesList = [
    {label: 'Ability NB', id: 'referral_source_ability_nb'},
    {label: 'Ambulatory Clinic (Outpatient)', id: 'referral_source_ambulatory_clinic_outpatient'},
    {label: 'Ambulance New Brunswick (ANB)', id: 'referral_source_anb'},
    {label: 'Community Health Centers', id: 'referral_source_community_health_centers'},
    {
        label: 'Specify: Nurse Practitioner or Family Physician',
        id: 'referral_source_nurse_practitioner_family_physician'
    },
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
    {
        label: 'Social Development - Home Adaptations for Seniors Independence Program',
        id: 'referral_source_social_home_adaptations'
    },
    {label: 'Social Development - Homeowner Repair Program', id: 'referral_source_social_homeowner_repair'},
    {label: 'Social Development - Housing Program', id: 'referral_source_social_housing_program'},
    {label: 'Social Development - Long-Term Care Program', id: 'referral_source_social_long_term_care'},
    {
        label: 'Social Development - Mobility and Adaptive Equipment Loan Program',
        id: 'referral_source_social_mobility_loan'
    },
    {label: 'Social Development - Social Assistance Program', id: 'referral_source_social_assistance'},
    {label: 'Volunteer Organizations', id: 'referral_source_volunter_organizations'},
    {label: 'Other', id: 'referral_source_other'}
];

const referralOrganizationsList = [
    {label: 'Ability NB', id: 1},
    {label: 'Ambulatory Clinic (Outpatient)', id: 2},
    {label: 'Ambulance New Brunswick (ANB)', id: 3},
    {label: 'Community Health Centers', id: 4},
    {label: 'Specify: Nurse Practitioner or Family Physician', id: 5},
    {label: 'Department of Veteran Affairs', id: 6},
    {label: 'Emergency Department', id: 7},
    {label: 'Extra-Mural Program', id: 8},
    {label: 'Family Physician (Outside Community Health Centers)', id: 9},
    {label: 'First Nations', id: 10},
    {label: 'Homecare Agency', id: 11},
    {label: 'Hospital (Inpatient)', id: 12},
    {label: 'Nursing Home', id: 13},
    {label: 'Public Health Services', id: 14},
    {label: 'Residential Facility', id: 15},
    {label: 'Self-referral or Referral by Family Member', id: 16},
    {label: 'Social Development - Home Adaptations for Seniors Independence Program', id: 17},
    {label: 'Social Development - Homeowner Repair Program', id: 18},
    {label: 'Social Development - Housing Program', id: 19},
    {label: 'Social Development - Long-Term Care Program', id: 20},
    {label: 'Social Development - Mobility and Adaptive Equipment Loan Program', id: 21},
    {label: 'Social Development - Social Assistance Program', id: 21},
    {label: 'Volunteer Organizations', id: 22},
    {label: 'Other', id: 23}
];

const caseDiscussionMembersPresentList = [
    {label: 'Ability NB', id: 'case_discussion_ability_nb'},
    {label: 'Addiction and Mental Health', id: 'case_discussion_addiction_mental_health'},
    {label: 'Ambulance NB', id: 'case_discussion_ambulance_nb'},
    {label: 'CCC Liaison Nurse', id: 'case_discussion_ccc_liaison_nurse'},
    {label: 'Community Pharmacist', id: 'case_discussion_community_pharmacist'},
    {label: 'Extra-Mural Program - Lead Nurse Case Manager', id: 'case_discussion_emp_lead_nurse_case_manager'},
    {label: 'Extra-Mural Program - Nutritionist', id: 'case_discussion_emp_nutritionist'},
    {label: 'Extra-Mural Program - Occupational Therapist', id: 'case_discussion_emp_occupational_therapist'},
    {label: 'Extra-Mural Program - Physical Therapist', id: 'case_discussion_emp_physical_therapist'},
    {label: 'Extra-Mural Program - Registered Nurse', id: 'case_discussion_emp_registered_nurse'},
    {label: 'Extra-Mural Program - Respiratory Therapist', id: 'case_discussion_emp_respiratory_therapist'},
    {label: 'Extra-Mural Program - Social Worker', id: 'case_discussion_emp_social_worker'},
    {label: 'Extra-Mural Program - Speech & Language Therapist', id: 'case_discussion_emp_speech_language_therapist'},
    {label: 'Extra-Mural Program - Other', id: 'case_discussion_emp_other'},
    {label: 'Family physician', id: 'case_discussion_family_physician'},
    {label: 'First Nations - First Nations Case Manager', id: 'case'},
    {label: 'Horizon Health Network', id: 17},
    {label: 'Nurse Practitioner', id: 18},
    {label: 'Social Development - Home Adaptations for Seniors Independence Program', id: 19},
    {label: 'Social Development - Homeowner Repair Program', id: 20},
    {label: 'Social Development - Housing Program', id: 21},
    {label: 'Social Development - Long-Term Care Program', id: 22},
    {label: 'Social Development - Mobility and Adaptive Equipment Loan Program', id: 23},
    {label: 'Social Development - Social Assistance Program', id: 24},
    {label: 'Social Development - Other', id: 25},
    {label: 'Others', id: 26}
];

const ReviewReferralDetails = ({referralDetails, setReferralDetail}) => {
    const referralData = useSelector(state => state.reviewBoard.referrals.add.referralData)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            referral_date: referralData.referral_date,
            date_of_case_discussion: referralData.date_of_case_discussion,

            referral_source: referralData.referral_source,
            referral_source_detail: referralData.referral_source_detail,

            organizations_upon_referral: referralData.organizations_upon_referral,
            organizations_upon_referral_detail: referralData.organizations_upon_referral_detail,

            members_present_case_discussion: referralData.members_present_case_discussion,
            members_present_case_discussion_detail: referralData.members_present_case_discussion_detail,

            case_management_organization_responsible: referralData.case_management_organization_responsible,
            case_management_organization_person_responsible: referralData.case_management_organization_person_responsible,
        },
        validate: values => {
            const valuesData = {
                ...referralData,
                ...values
            }
            dispatch(setReferralDetails(valuesData));
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} noValidate>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={8} lg={4}>
                    <MaskedInput
                        mask={[/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                        className='form-control'
                        label='Date of Referral'
                        guide={false}
                        value={formik.values.referral_date}
                        id='referral_date'
                        name='referral_date'
                        onChange={formik.handleChange}
                        render={(ref, props) => <TextField fullWidth inputRef={ref} {...props}/>}
                    />
                </Grid>

                <Grid item xs={12} md={8} lg={4}>
                    <MaskedInput
                        mask={[/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                        className='form-control'
                        label='Date of Case Discussion'
                        guide={false}
                        value={formik.values.date_of_case_discussion}
                        id='date_of_case_discussion'
                        name='date_of_case_discussion'
                        onChange={formik.handleChange}
                        render={(ref, props) => <TextField fullWidth inputRef={ref} {...props} />}
                    />
                </Grid>

                <Grid item xs={12} md={8} lg={6}>
                    <SubCard title='Referral Source'>
                        <CardContent>
                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <Autocomplete
                                    disablePortal
                                    options={referralSourcesList}
                                    name='referral_source'
                                    id='referral_source'
                                    value={formik.values.referral_source}
                                    onChange={(e, value) => {
                                        formik.setFieldValue('referral_source', value)
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Grid>
                        </CardContent>
                    </SubCard>
                </Grid>

                <Grid item xs={12} sm={10} lg={6}>
                    <SubCard title='Organizations Involved Upon Referral'>
                        <CardContent>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={12} lg={12} md={12}>
                                    <Autocomplete
                                        multiple
                                        options={referralOrganizationsList}
                                        value={formik.values.organizations_upon_referral}
                                        getOptionLabel={(option) => option.label}
                                        onChange={(e, value) => {
                                            formik.setFieldValue('organizations_upon_referral', value)
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                        name='organizations_upon_referral'
                                        id='organizations_upon_referral'
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

                <Grid item xs={12} sm={10} lg={6}>
                    <SubCard title='Members Present for Case Discussion'>
                        <CardContent>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={12} lg={12} md={12}>
                                    <Autocomplete
                                        multiple
                                        options={caseDiscussionMembersPresentList}
                                        getOptionLabel={(option) => option.label}
                                        value={formik.values.members_present_case_discussion}
                                        name='members_present_case_discussion'
                                        id='members_present_case_discussion'
                                        renderInput={(params) => <TextField {...params} />}
                                        onChange={(e, value) => {
                                            formik.setFieldValue('members_present_case_discussion', value)
                                        }}
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


                <Grid item xs={12} sm={10} lg={6}>
                    <SubCard title='Organization responsible for Client Case Management'>
                        <CardContent>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={12} lg={12} md={12}>
                                    <Autocomplete
                                        disablePortal
                                        options={organizationResponsible}
                                        name='case_management_organization_responsible'
                                        value={formik.values.case_management_organization_responsible}
                                        id='case_management_organization_responsible'
                                        onChange={(e, value) => {
                                            formik.setFieldValue('case_management_organization_responsible', value)
                                        }}
                                        renderInput={(params) => <TextField {...params} label="Organization"/>}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </SubCard>
                </Grid>

            </Grid>
        </form>
    );
};

export default ReviewReferralDetails;

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


import ReferralSource from './referral-source';
import CasePresentationForm from './case-presentation-form';
import OrganizationResponsible from './organization-responsible';
import {setClientDetail, setReferralDetail} from "store/actions/reviewBoard/referralActions";
import {connect} from "react-redux";
import {useFormik} from "formik";


const referralSourcesList = [
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
    const formik = useFormik({
        initialValues: {
            referralDate: '',
            discussionDate: '',

            referralSource: 'referral_source_ability_nb',

            referralOrganizations: [],
            referralOrganizationsDetail: '',

            membersPresentCaseDiscussion: [],
            membersPresentCaseDiscussionDetail: '',

            caseManagementOrganization: '',
            caseManagementOrganizationDetail: '',

            decision: '',
            decisionDetail: ''
        },
        onSubmit: (values) => {
            setReferralDetail(values)
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
                        id='referralDate'
                        name='referralDate'
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
                        value={formik.values.client_referral_first_name}
                        id='discussionDate'
                        name='discussionDate'
                        onChange={formik.handleChange}
                        render={(ref, props) => <TextField fullWidth inputRef={ref} {...props} />}
                    />
                </Grid>

                <Grid item xs={12} md={8} lg={10}>
                    <ReferralSource name='referralSource' id='referralSource' formik={formik}
                                    value={formik.values.referralSource}/>
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
                                        onChange={(e, value) => {
                                            formik.setFieldValue('referralOrganizations', value)
                                        }}
                                        name='referralOrganizations'
                                        id='referralOrganizations'
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
                                        onChange={(e, value) => {
                                            formik.setFieldValue('membersPresentCaseDiscussion', value)
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

                <Grid item xs={12} sm={10} lg={10}>
                    <OrganizationResponsible name='caseManagementOrganization' id='caseManagementOrganization' formik={formik} value={formik.values.referralSource}/>
                </Grid>

                <Grid item xs={6} sm={6} lg={6} md={4}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={12} lg={8} md={8}>
                            <Button color='primary' variant='contained' fullWidth type='submit'>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};

function mapStateToProps(state) {
    return {
        referralDetails: state.reviewBoard.referralActivity.referralDetail
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setReferralDetail: (values) => dispatch(setReferralDetail(values))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewReferralDetails);

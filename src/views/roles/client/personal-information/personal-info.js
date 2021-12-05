import React from 'react';

// material-ui
import {Autocomplete, Button, Grid, MenuItem, TextField} from '@material-ui/core';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import {gridSpacing} from 'store/constant';
import MaskedInput from "react-text-mask";

import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";

import setPersonalInformationDetails from "store/actions/client/personalInformationActions";

// select options
const genders = [
    {
        value: 'gender-male',
        label: 'Male'
    },
    {
        value: 'gender-female',
        label: 'Female'
    },
    {
        value: 'gender-binary',
        label: 'Binary'
    },
    {
        value: 'gender-prefer-not-to-answer',
        label: 'Prefer not to answer',
    },
];

const ethnicBackgroundOptions = [
    {
        value: 'ethnic-background-white-caucasian',
        label: 'White-Caucasian'
    },
    {
        value: 'ethnic-background-indigenous-first-nations',
        label: 'Indigenous - First Nations'
    },
    {
        value: 'ethnic-background-indigenous-metis',
        label: 'Indigenous - Metis'
    },
    {
        value: 'ethnic-background-indigenous-inuit',
        label: 'Indigenous - Inuit'
    },
    {
        value: 'ethnic-background-indigenous-other',
        label: 'Indigenous - Other'
    },
    {
        value: 'ethnic-background-asian',
        label: 'Asian'
    },
    {
        value: 'ethnic-background-african-caribbean-black-canadian',
        label: 'African-Caribbean-Black Canadian'
    },
    {
        value: 'ethnic-background-hispanic',
        label: 'Hispanic'
    },
    {
        value: 'ethnic-background-other',
        label: 'Other'
    },
];

const maritalStatusOptions = [
    {
        value: 'marital-status-single',
        label: 'Single'
    }, {
        value: 'marital-status-married',
        label: 'Married'
    }, {
        value: 'marital-status-common-law',
        label: 'Common-Law'
    }, {
        value: 'marital-status-separated',
        label: 'Separated'
    }, {
        value: 'marital-status-divorced',
        label: 'Divorced'
    }, {
        value: 'marital-status-widowed',
        label: 'Widowed'
    }, {
        value: 'marital-status-prefer-not-to-answer',
        label: 'Prefer not to answer'
    },
    {
        value: 'marital-status-other',
        label: 'Other'
    },
];

const familySituationOptions = [
    {
        value: 'family-situation-lives-alone',
        label: 'Lives Alone'
    }, {
        value: 'family-situation-lives-with-one-person',
        label: 'Lives with 1 person'
    }, {
        value: 'family-situation-lives-with-two-more-people',
        label: 'Lives with 2 or more people'
    },
    {
        value: 'family-situation-other',
        label: 'Other'
    },
];

const highestLevelOfEducationOptions = [
    {
        value: 'highest-level-of-education-pre-schooling-or-no-schooling',
        label: 'Pre-schooling or no schooling'
    },
    {
        value: 'highest-level-of-education-primary-school',
        label: 'Primary school (Grades 1-6)'
    },
    {
        value: 'highest-level-of-education-middle-school',
        label: 'Primary school (Grades 7-9)'
    },
    {
        value: 'highest-level-of-education-high-school-diploma-professional-studies',
        label: 'High School Diploma - Professional Studies'
    },
    {
        value: 'highest-level-of-education-high-school-diploma-college-studies',
        label: 'High School Diploma - College Studies'
    },
    {
        value: 'highest-level-of-education-bachelors-degree',
        label: `Bachelor's Degree`
    }, {
        value: 'highest-level-of-education-masters-degree',
        label: `Master's Degree`
    }, {
        value: 'highest-level-of-education-professional-degree',
        label: `Professional Degree`
    }, {
        value: 'highest-level-of-education-doctoral-degree',
        label: 'Doctoral Degree'
    }, {
        value: 'highest-level-of-education-foreign-degree',
        label: 'Foreign Degree'
    },
    {
        value: 'highest-level-of-education-other',
        label: 'Other'
    },
];

const employmentOptions = [
    {
        value: 'employment-employed',
        label: 'Employed'
    }, {
        value: 'employment-unemployed',
        label: 'Unemployed'
    }, {
        value: 'employment-retired',
        label: 'Retired'
    }, {
        value: 'employment-unable-to-work',
        label: 'Unable to work'
    }, {
        value: 'employment-disability-benefits',
        label: 'Disability Benefits'
    },
    {
        value: 'employment-other',
        label: 'Other'
    },
];

const annualHouseholdIncomeOptions = [
    {
        value: 'annual-household-income-less-than-five-thousand',
        label: 'Less than $5,000'
    }, {
        value: 'annual-household-income-five-thousand-to-eleven-thousand-ninety-nine',
        label: '$5,000 through $11,999'
    }, {
        value: 'annual-household-income-twelve-thousand-to-twenty-four-thousand-ninety-nine',
        label: '$12,000 through $24,999'
    }, {
        value: 'annual-household-income-twenty-five-thousand-to-forty-nine-thousand',
        label: '$25,000 through $49,999'
    }, {
        value: 'annual-household-income-fifty-thousand-to-ninety-nine-thousand',
        label: '$50,000 through $99,999'
    },
    {
        value: 'annual-household-income-hundred-thousand-and-greater',
        label: '$100,000 and greater'
    },
    {
        value: 'annual-household-income-i-dont-know',
        label: `I don't know`
    },
    {
        value: 'annual-household-income-prefer-not-to-answer',
        label: 'I prefer not to answer'
    },
    {
        value: 'annual-household-income-other',
        label: 'Other'
    },
];

const housingSituationOptions = [
    {
        value: 'housing-situation-lives-in-own-property-apartment',
        label: 'Lives in their Own Property - Apartment'
    }, {
        value: 'housing-situation-lives-in-own-property-condominium',
        label: 'Lives in their Own Property - Condominium'
    }, {
        value: 'housing-situation-lives-in-own-property-single-home-townhouse',
        label: 'Lives in their Own Property - Single Home or Townhouse'
    }, {
        value: 'housing-situation-lives-in-rented-property',
        label: 'Lives in Rented Property'
    },
    {
        value: 'housing-situation-other',
        label: 'Other'
    },
];

const languageProficiencyOptions = [
    {
        id: 'language-proficiency-english-low',
        label: 'English - Low'
    },
    {
        id: 'language-proficiency-english-intermediate',
        label: 'English - Intermediate'
    },
    {
        id: 'language-proficiency-english-high',
        label: 'English - High'
    },
    {
        id: 'language-proficiency-french-low',
        label: 'French - Low'
    },
    {
        id: 'language-proficiency-french-intermediate',
        label: 'French - Intermediate'
    },
    {
        id: 'language-proficiency-french-high',
        label: 'French - High'
    },
    {
        id: 'language-proficiency-other',
        label: 'Other'
    },
    {
        id: 'language-proficiency-interpreter-needed',
        label: 'Interpreter Needed'
    }
];

const PersonalInformation = () => {
    const personalInfoData = useSelector(state => state.client.personalInformation)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            date_of_birth: personalInfoData.date_of_birth,
            gender: personalInfoData.gender,
            ethnic_background: personalInfoData.ethnic_background,
            language_proficiency: personalInfoData.language_proficiency,
            marital_status: personalInfoData.marital_status,
            family_situation: personalInfoData.family_situation,
            education: personalInfoData.education,
            employment: personalInfoData.employment,
            household_income: personalInfoData.household_income,
            housing_situation: personalInfoData.housing_situation,
        },
        validate: values => {
            dispatch(setPersonalInformationDetails(values))
        }
    });


    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={6}>
                <SubCard title="Personal Information">
                    <form noValidate autoComplete="off">
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={6}>
                                <MaskedInput
                                    mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]}
                                    className='form-control'
                                    label='Date of Birth'
                                    guide={false}
                                    value={formik.values.date_of_birth}
                                    onChange={formik.handleChange}
                                    id='date_of_birth'
                                    name='date_of_birth'
                                    render={(ref, props) => <TextField fullWidth inputRef={ref} {...props} />}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Gender"
                                    value={formik.values.gender}
                                    id='gender'
                                    name='gender'
                                    onChange={formik.handleChange}
                                >
                                    {genders.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Ethnic Background"

                                    value={formik.values.ethnic_background}
                                    id='ethnic_background'
                                    name='ethnic_background'
                                    onChange={formik.handleChange}
                                >
                                    {ethnicBackgroundOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>

                                <Autocomplete
                                    multiple
                                    options={languageProficiencyOptions}
                                    label='Language Proficiency'

                                    value={formik.values.language_proficiency}
                                    id='language_proficiency'
                                    name='language_proficiency'
                                    onChange={(e, value) => {
                                        formik.setFieldValue('language_proficiency', value)
                                    }}

                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} />}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            pr: '30px !important'
                                        }
                                    }}
                                />

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Current Marital Status"

                                    value={formik.values.marital_status}
                                    id='marital_status'
                                    name='marital_status'
                                    onChange={formik.handleChange}
                                >
                                    {maritalStatusOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Current Family Situation"

                                    value={formik.values.family_situation}
                                    id='family_situation'
                                    name='family_situation'
                                    onChange={formik.handleChange}
                                >
                                    {familySituationOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Housing Situation"

                                    value={formik.values.housing_situation}
                                    id='housing_situation'
                                    name='housing_situation'
                                    onChange={formik.handleChange}
                                >
                                    {housingSituationOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </form>
                </SubCard>
            </Grid>

            <Grid item xs={12} md={6}>
                <SubCard title="Professional Information">
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                fullWidth
                                label="Highest Level of Education"

                                value={formik.values.education}
                                id='education'
                                name='education'
                                onChange={formik.handleChange}
                            >
                                {highestLevelOfEducationOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                fullWidth
                                label="Employment"

                                value={formik.values.employment}
                                id='employment'
                                name='employment'
                                onChange={formik.handleChange}
                            >
                                {employmentOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                fullWidth
                                label="Annual Household Income (Before taxes and deductions)"

                                value={formik.values.household_income}
                                id='household_income'
                                name='household_income'
                                onChange={formik.handleChange}
                            >
                                {annualHouseholdIncomeOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>

                </SubCard>
            </Grid>

            <Grid item xs={12} md={6}>
                <Button color='secondary' variant='contained' size='large'
                        onClick={(e) => console.log(e)}>
                    Save
                </Button>
            </Grid>
        </Grid>
    );
};

export default PersonalInformation;

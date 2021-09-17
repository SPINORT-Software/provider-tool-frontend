import React from 'react';

// material-ui
import {Grid, Button, Step, Stepper, StepLabel, Stack, Typography} from '@material-ui/core';

// project imports
import ConfigurableForm from './ConfigurableForm';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import {gridSpacing} from 'store/constant';
import {connect} from 'react-redux';
import * as actions from 'store/actions';
import {fetchSectionAttributes} from "store/actions";

// ===========================|| FORMS WIZARD - BASIC ||=========================== //

const ConfigurableForms = ({uuid, title, sectionData}) => {
    const sectionAttributeGroups = sectionData.sections[uuid].attribute_groups
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const processAttributeGroups = () => {
        const steps = []
        const stepFields = []

        Object.entries(sectionAttributeGroups).map(attributeGroupItem => {
            const attributeGroupCode = attributeGroupItem[0]
            const attributeGroup = attributeGroupItem[1]

            const title = attributeGroup.group_detail.attribute_group_name;
            steps.push(title)

            stepFields.push({
                defaultAttributes:attributeGroup.default_attributes,
                childAttributeGroups:attributeGroup.child_attribute_groups
            })
            return true;
        })

        return {steps, stepFields}
    }
    const attributeStepsAndGroupData = processAttributeGroups();

    // step options
    const {steps, stepFields} = attributeStepsAndGroupData;

    function getStepContent(step) {
        if(step < steps.length){
            return <ConfigurableForm groupData={stepFields[step]}/>;
        }
        // throw new Error('Unknown step');
        return <div>
            Unknown Step
        </div>
    }

    return (
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={9} lg={9}>
                <MainCard title={title}>
                    <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <>
                        {activeStep === steps.length ? (
                            <>
                                <Typography variant="h5" gutterBottom>
                                    After submission.
                                </Typography>
                                <Stack direction="row" justifyContent="flex-end">
                                    <AnimateButton>
                                        <Button variant="contained" color="error" onClick={() => setActiveStep(0)}
                                                sx={{my: 3, ml: 1}}>
                                            Reset
                                        </Button>
                                    </AnimateButton>
                                </Stack>
                            </>
                        ) : (
                            <>
                                {getStepContent(activeStep)}
                                <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{my: 3, ml: 1}}>
                                            Back
                                        </Button>
                                    )}
                                    <AnimateButton>
                                        <Button variant="contained" onClick={handleNext} sx={{my: 3, ml: 1}}>
                                            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                        </Button>
                                    </AnimateButton>
                                </Stack>
                            </>
                        )}
                    </>
                </MainCard>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = state => ({
    sectionData: state.sectionForm
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurableForms)

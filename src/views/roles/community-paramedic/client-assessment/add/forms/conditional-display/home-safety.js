import React from 'react';

// material-ui
import {makeStyles, useTheme} from '@material-ui/styles';
import {
    CardContent,
    Button,
    Divider, FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    MenuItem, Radio, RadioGroup, Slider,
    Switch,
    TextField,
    Typography
} from '@material-ui/core';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import {gridSpacing} from 'store/constant';

// assets
import FaceTwoToneIcon from "@material-ui/icons/FaceTwoTone";
import DomainTwoToneIcon from "@material-ui/icons/DomainTwoTone";
import MonetizationOnTwoToneIcon from "@material-ui/icons/MonetizationOnTwoTone";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Accordion from 'ui-component/extended/Accordion';
import MainCard from "ui-component/cards/MainCard";

// style constant
const useStyles = makeStyles((theme) => ({
    deviceName: {
        '& >span': {
            fontSize: '90%',
            fontWeight: '400'
        }
    },
    deviceState: {
        display: 'inline-flex',
        alignItems: 'center',
        '& >svg': {
            width: '0.7em',
            height: '0.7em',
            marginRight: '5px'
        }
    },
    textActive: {
        color: theme.palette.success.main
    },
    textMuted: {
        color: theme.palette.grey[400]
    }
}));


const HomeSafetyAssessment = () => {
    const theme = useTheme();
    const [valueColor, setValueColor] = React.useState('default');
    const assessmentQuestions = {
        "outside": {
            "title": "Outside",
            "questions": [
                {
                    "question_text": "Are the paths around the property in good repair?",
                    "radio_group_name": "outside-paths-around-property"
                },
                {
                    "question_text": "Are the walkways clear of clutter? (i.e., ice and snow in Winter)",
                    "radio_group_name": "outside-walkways-clear-clutter"
                },
                {
                    "question_text": "Are the paths and entrances well lit?",
                    "radio_group_name": "outside-paths-entrances-well-lit"
                },
                {
                    "question_text": "Are the stairs leading to the property in good repair?",
                    "radio_group_name": "outside-paths-stairs-good-repair"
                },
                {
                    "question_text": "Are the edges of the outside steps slip-resistant?",
                    "radio_group_name": "outside-paths-edges-outside-slip-resistant"
                },
                {
                    "question_text": "Are you able to see the edges of the outside steps clearly?",
                    "radio_group_name": "outside-paths-edges-outside-seen-clearly"
                },
                {
                    "question_text": "Is the doorbell functioning?",
                    "radio_group_name": "outside-paths-doorbell-functioning"
                }
            ]
        },
        "garage": {
            "title": "Garage",
            "questions": [
                {
                    "question_text": "Can you easily enter or exit the vehicle in the garage?",
                    "radio_group_name": "garage-easily-enter-exit-vehicle"
                },
                {
                    "question_text": "Can you safely manoeuvre in your garage?",
                    "radio_group_name": "garage-safely-manoeuvre"
                },
                {
                    "question_text": "Is the garage well lit?",
                    "radio_group_name": "garage-well-lit"
                },
            ]
        },
        "indoor-stairs": {
            "title": "Indoor Stairs",
            "questions": [
                {
                    "question_text": "Are the stairs build in safe way?",
                    "radio_group_name": "indoor-stairs-build-safe-way"
                }, {
                    "question_text": "Do all stairs have a sturdy handrail?",
                    "radio_group_name": "indoor-stairs-sturdy-handrail"
                }, {
                    "question_text": "Are you able to see the edges of the steps clearly?",
                    "radio_group_name": "indoor-stairs-edges-steps-seen-clearly"
                }, {
                    "question_text": "Are the stairs visible when the light is turned on?",
                    "radio_group_name": "indoor-stairs-visible-light-turned-on"
                },
            ]
        },
        "floors-hallways": {
            "title": "Floors and Hallways",
            "questions": [
                {
                    "question_text": "Are the floors and the hallways well lit?",
                    "radio_group_name": "floors-hallways-well-lit"
                }, {
                    "question_text": "Do the carpets and mats lie flat without wrinkles or curled edges?",
                    "radio_group_name": "floors-hallways-carpets-mats-wrinkles"
                }, {
                    "question_text": "Are the floors clear of clutter?",
                    "radio_group_name": "floors-hallways-clear-of-clutter"
                }
            ]
        },
        "basement": {
            "title": "Basement",
            "questions": [
                {
                    "question_text": "Is the basement properly lit?",
                    "radio_group_name": "basement-properly-lit"
                },
                {
                    "question_text": "Can you easily access the basement appliances?",
                    "radio_group_name": "basement-easily-access-appliances"
                }
            ]
        },
        "bathroom": {
            "title": "Bathroom",
            "questions": [
                {
                    "question_text": "Are there slip resistant mats in the bathroom?",
                    "radio_group_name": "bathroom-slip-resistant-mats"
                },
                {
                    "question_text": "Is there a slip resistant mat in the bathtub or shower?",
                    "radio_group_name": "bathroom-slip-resistant-mat-bathtub-shower"
                },
                {
                    "question_text": "Do you have assistive devices in the bathroom?",
                    "radio_group_name": "bathroom-assistive-devices"
                },
                {
                    "question_text": "Are there grab bars near the bathtub, shower, and toilet?",
                    "radio_group_name": "bathroom-grab-bars-shower-toilet"
                },
                {
                    "question_text": "Is there bath seat in the bathtub or shower?",
                    "radio_group_name": "bathroom-bath-seat-bathtub"
                },
                {
                    "question_text": "Do you have bathtub lift?",
                    "radio_group_name": "bathroom-lift"
                },
                {
                    "question_text": "Is the shower build separately from the bathtub?",
                    "radio_group_name": "bathroom-shower-build-separate"
                },
                {
                    "question_text": "Is it easy to reach frequently used bathroom items?",
                    "radio_group_name": "bathroom-reach-frequent-items"
                }
            ]
        },
        "toilet": {
            "title": "Toilet",
            "questions": [
                {
                    "question_text": "Are all toilets in the house easily accessible?",
                    "radio_group_name": "toilet-house-easily-accessible"
                },
                {
                    "question_text": "o Are you using a toilet seat riser?",
                    "radio_group_name": "toilet-seat-riser"
                },
            ]
        },
        "living-room": {
            "title": "Living Room",
            "questions": [
                {
                    "question_text": "Is the lounge chair safe? (Meaning is your chair at the correct height, and with adequate arm rests?)",
                    "radio_group_name": "living-room-lounger-chair-safe"
                },
                {
                    "question_text": "Is there adequate lighting in the living room?",
                    "radio_group_name": "living-room-adequate-lighting"
                },
                {
                    "question_text": "Is the doorbell functioning and easy to hear?",
                    "radio_group_name": "living-room-doorbell-functioning"
                },
            ]
        },
        "telephone": {
            "title": "Telephone",
            "questions": [
                {
                    "question_text": "Do you have a fixed home phone line?",
                    "radio_group_name": "telephone-fixed-home-phone-line"
                },
                {
                    "question_text": "Is the home phone line within easy reach?",
                    "radio_group_name": "telephone-within-reach"
                },
                {
                    "question_text": "Do you have a mobile phone?",
                    "radio_group_name": "telephone-mobile-phone"
                },
            ]
        },
        "bedroom": {
            "title": "Bedroom",
            "questions": [
                {
                    "question_text": "Are you able to turn on a light before getting out of bed?",
                    "radio_group_name": "bedroom-turn-light-before-out-of-bed"
                },
                {
                    "question_text": "Is it easy to get out of bed?",
                    "radio_group_name": "bedroom-easy-out-of-bed"
                },
                {
                    "question_text": "Is the path to the nearest toilet safe?",
                    "radio_group_name": "bedroom-nearest-toilet-safe"
                },
            ]
        },
        "kitchen": {
            "title": "Kitchen",
            "questions": [
                {
                    "question_text": "Do the cabinet doors and drawers close all the way?",
                    "radio_group_name": "kitchen-cabinet-doors-close-allway"
                },
                {
                    "question_text": "Is it easy to reach frequently used kitchen items?",
                    "radio_group_name": "kitchen-easy-reach-frequent-items"
                },
                {
                    "question_text": "Is there a step stool in the kitchen?",
                    "radio_group_name": "kitchen-step-stool"
                },
                {
                    "question_text": "Is there a slip resistant mat in front of the kitchen sink?",
                    "radio_group_name": "kitchen-slip-resistant-mat-front-sink"
                },
                {
                    "question_text": "Is the ventilation adequate?",
                    "radio_group_name": "kitchen-ventilation-adequate"
                },
            ]
        },
        "first-safety-concerns": {
            "title": "First Safety Concerns",
            "questions": [
                {
                    "question_text": "Are there smokers in the home?",
                    "radio_group_name": "first-safety-concerns-smokers-home"
                },
                {
                    "question_text": "Are smoke detectors functioning?",
                    "radio_group_name": "first-safety-concerns-smoke-detectors-functioning"
                },
                {
                    "question_text": "Are carbon monoxide detectors functioning?",
                    "radio_group_name": "first-safety-concerns-carbon-monoxide-detectors"
                },
                {
                    "question_text": "Is there a fire extinguisher in the home?",
                    "radio_group_name": "first-safety-concerns-fire-extinguisher"
                },
                {
                    "question_text": "Is the fireplace or wood stove safe?",
                    "radio_group_name": "first-safety-concerns-fireplace-wood-stove-safe"
                },
            ]
        },
        "other-safety-concerns": {
            "title": "Other Safety Concerns",
            "questions": [
                {
                    "question_text": "Can a walking aid easily be used in the home?",
                    "radio_group_name": "other-safety-concerns-walking-aid-easy-use"
                }, {
                    "question_text": "Are there pets in the home?",
                    "radio_group_name": "other-safety-concerns-pets-at-home"
                }, {
                    "question_text": "Is an emergency contact list easily accessible if needed?",
                    "radio_group_name": "other-safety-concerns-emergency-contact-available"
                }, {
                    "question_text": "Are there any water leaks inside the house?",
                    "radio_group_name": "other-safety-concerns-water-leaks-inside-house"
                }, {
                    "question_text": "Is there mold in the house?",
                    "radio_group_name": "other-safety-concerns-mold-house"
                }, {
                    "question_text": "Are there signs of pest infestation in the house?",
                    "radio_group_name": "other-safety-concerns-pest-infestation-house"
                }, {
                    "question_text": "Does the heating system work properly?",
                    "radio_group_name": "other-safety-concerns-heating-system-work-properly"
                }, {
                    "question_text": "Does the paint in the house contain lead?",
                    "radio_group_name": "other-safety-concerns-paint-house-lead"
                }, {
                    "question_text": "Are the pipes in the house in good condition? (e.g., broken, eroded, etc.)",
                    "radio_group_name": "other-safety-concerns-house-pipes-good-condition"
                },
            ]
        }
    }

    const safetyAssessmentQuestionsRender = Object.keys(assessmentQuestions).map((assessmentCategoryKey, index) => {
        const {title: assessmentCategoryTitle, questions} = assessmentQuestions[assessmentCategoryKey];
        const preparedAssessmentQuestionsRender = questions.map((question, index) => {
            const {question_text: questionText, radio_group_name: radioGroupName} = question;

            return <Grid container spacing={gridSpacing} direction="column"
                         alignItems="left">


                <Grid item xs={12}>
                    <Typography variant="subtitle1">{questionText}</Typography>

                    <Divider />
                    <FormControl>
                        <RadioGroup
                            row
                            aria-label="gender"
                            value={valueColor}
                            onChange={(e) => setValueColor(e.target.value)}
                            name={radioGroupName}
                        >
                            <FormControlLabel
                                value={`home-safety-assessment-${radioGroupName}-yes`}
                                control={
                                    <Radio
                                        sx={{
                                            color: theme.palette.primary.main,
                                            '&.Mui-checked': {color: theme.palette.primary.main}
                                        }}
                                    />
                                }
                                label="Yes"
                            />

                            <FormControlLabel
                                value={`home-safety-assessment-${radioGroupName}-no`}
                                control={
                                    <Radio
                                        sx={{
                                            color: theme.palette.error.main,
                                            '&.Mui-checked': {color: theme.palette.error.main}
                                        }}
                                    />
                                }
                                label="No"
                            />

                            <FormControlLabel
                                value={`home-safety-assessment-${radioGroupName}-na`}
                                control={
                                    <Radio
                                        sx={{
                                            color: theme.palette.success.main,
                                            '&.Mui-checked': {color: theme.palette.success.main}
                                        }}
                                    />
                                }
                                label="N/A"
                            />
                        </RadioGroup>
                    </FormControl>
                    <Divider/>
                </Grid>
            </Grid>
        })

        return (
            <Grid item xs={12} md={10} lg={12}>
                <MainCard title={assessmentCategoryTitle}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={10} sm={6} lg={10} md={6}>
                                {preparedAssessmentQuestionsRender}
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            </Grid>
        )
    })

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard title="Home Safety Assessment">
                    <Grid container spacing={gridSpacing}>
                        {safetyAssessmentQuestionsRender}
                    </Grid>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default HomeSafetyAssessment;

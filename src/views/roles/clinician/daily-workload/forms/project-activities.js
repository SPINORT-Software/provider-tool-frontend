import React, {useEffect, useState} from 'react';

// material-ui
import {CardContent, Grid, TextField} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import MaskedInput from 'react-text-mask';

// redux
import {useDispatch, useSelector} from "react-redux";
import {setDailyWorkLoadDetails} from "store/actions/caseManager/dailyWorkloadActions";
import {useFormik} from "formik";

const ProjectActivities = ({retrieveMode}) => {
    const dailyWorkloadData = useSelector(state => state.caseManager.dailyWorkload.add)
    const dispatch = useDispatch()
    const [isRetrieveMode, setIsRetrieveMode] = useState(false);

    useEffect(() => {
        // Switch to retrieve mode if set in the props
        if (retrieveMode) {
            setIsRetrieveMode(true)
        }
    }, [retrieveMode])

    const formik = useFormik({
        initialValues: {
            research_related_meetings_total_time: dailyWorkloadData.research_related_meetings_total_time,
            research_related_administration_total_time: dailyWorkloadData.research_related_administration_total_time,
            research_related_other: dailyWorkloadData.research_related_other,
        },
        validate: values => {
            const valuesData = {
                ...values
            }
            if (!retrieveMode) {
                dispatch(setDailyWorkLoadDetails(valuesData));
            }
        }
    });

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={6}>

                <SubCard title='Research Meetings'>
                    <CardContent>
                        <MaskedInput
                            mask={[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]}
                            className="form-control"
                            label="Total time spent"
                            guide={false}
                            defaultValue={formik.values.research_related_meetings_total_time}
                            onChange={formik.handleChange}
                            name="research_related_meetings_total_time"
                            id="research_related_meetings_total_time"
                            value={formik.values.research_related_meetings_total_time}
                            disabled={isRetrieveMode}
                            render={(ref, props) => <TextField fullWidth inputRef={ref} {...props}
                                                               defaultValue=""/>}
                        />
                    </CardContent>
                </SubCard>

            </Grid>

            <Grid item xs={12} sm={6}>
                <SubCard title='Administration (e.g., data gathering, sharing institutional documents, etc.)'>
                    <CardContent>
                        <MaskedInput
                            mask={[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]}
                            className="form-control"
                            label="Total time spent"
                            guide={false}
                            defaultValue={formik.values.research_related_administration_total_time}
                            onChange={formik.handleChange}
                            name="research_related_administration_total_time"
                            id="research_related_administration_total_time"
                            disabled={isRetrieveMode}
                            value={formik.values.research_related_administration_total_time}
                            render={(ref, props) => <TextField fullWidth inputRef={ref} {...props}
                                                               defaultValue=""/>}
                        />
                    </CardContent>
                </SubCard>
            </Grid>

            <Grid item xs={12} sm={6}>

                <SubCard title='Other'>
                    <CardContent>
                        <MaskedInput
                            mask={[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]}
                            className="form-control"
                            label="Total time spent"
                            guide={false}
                            defaultValue={formik.values.research_related_other}
                            onChange={formik.handleChange}
                            name="research_related_other"
                            disabled={isRetrieveMode}
                            id="research_related_other"
                            value={formik.values.research_related_other}
                            render={(ref, props) => <TextField fullWidth inputRef={ref} {...props}
                                                               defaultValue=""/>}
                        />
                    </CardContent>
                </SubCard>

            </Grid>
        </Grid>
    );
};

export default ProjectActivities;

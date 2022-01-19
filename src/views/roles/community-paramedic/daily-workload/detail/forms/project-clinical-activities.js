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

const ProjectClinicalActivities = ({retrieveMode}) => {
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
            project_case_management_total_time: dailyWorkloadData.project_case_management_total_time,
            project_case_management_admin_total_time: dailyWorkloadData.project_case_management_admin_total_time,
            project_case_management_admin_other: dailyWorkloadData.project_case_management_admin_other,
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
            <Grid item xs={12} sm={6} lg={6}>
                <SubCard title='Case Management Review Board'>
                    <CardContent>

                        <MaskedInput
                            mask={[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]}
                            className="form-control"
                            label="Total time spent"
                            guide={false}
                            defaultValue={formik.values.project_case_management_total_time}
                            onChange={formik.handleChange}
                            name="project_case_management_total_time"
                            id="project_case_management_total_time"
                            disabled={isRetrieveMode}
                            value={formik.values.project_case_management_total_time}
                            render={(ref, props) => <TextField fullWidth inputRef={ref} {...props}
                                                               defaultValue=""/>}
                        />
                    </CardContent>
                </SubCard>
            </Grid>

            <Grid item xs={12} sm={6} lg={6}>
                <SubCard title='Administration (e.g., protocol, process, meetings, etc.)'>
                    <CardContent>
                        <MaskedInput
                            mask={[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]}
                            className="form-control"
                            label="Total time spent"
                            guide={false}
                            defaultValue={formik.values.project_case_management_admin_total_time}
                            onChange={formik.handleChange}
                            name="project_case_management_admin_total_time"
                            id="project_case_management_admin_total_time"
                            disabled={isRetrieveMode}
                            value={formik.values.project_case_management_admin_total_time}
                            render={(ref, props) => <TextField fullWidth inputRef={ref} {...props}
                                                               defaultValue=""/>}
                        />
                    </CardContent>
                </SubCard>
            </Grid>

            <Grid item xs={12} sm={6} lg={6}>
                <SubCard title='Other'>
                    <CardContent>
                        <MaskedInput
                            mask={[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]}
                            className="form-control"
                            label="Total time spent"
                            guide={false}
                            defaultValue={formik.values.project_case_management_admin_other}
                            onChange={formik.handleChange}
                            name="project_case_management_admin_other"
                            id="project_case_management_admin_other"
                            disabled={isRetrieveMode}
                            value={formik.values.project_case_management_admin_other}
                            render={(ref, props) => <TextField fullWidth inputRef={ref} {...props}
                                                               defaultValue=""/>}
                        />
                    </CardContent>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default ProjectClinicalActivities;

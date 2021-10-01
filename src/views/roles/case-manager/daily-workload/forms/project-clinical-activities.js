import React from 'react';

// material-ui
import { Checkbox, CardContent, FormControlLabel, Grid, MenuItem, TextField } from '@material-ui/core';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import MaskedInput from 'react-text-mask';

const ProjectClinicalActivities = () => {
    const [state1, setState1] = React.useState({
        checkedA: true
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
                            id="workload-case-management-review-time-spent"
                            onBlur={() => {}}
                            onChange={() => {}}
                            render={(ref, props) => <TextField fullWidth inputRef={ref} {...props} defaultValue="" />}
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
                            id="workload-project-administration-time-spent"
                            onBlur={() => {}}
                            onChange={() => {}}
                            render={(ref, props) => <TextField fullWidth inputRef={ref} {...props} defaultValue="" />}
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
                            id="workload-other-time-spent"
                            onBlur={() => {}}
                            onChange={() => {}}
                            render={(ref, props) => <TextField fullWidth inputRef={ref} {...props} defaultValue="" />}
                        />
                    </CardContent>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default ProjectClinicalActivities;

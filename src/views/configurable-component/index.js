import React from 'react';

import {
    Checkbox,
    Divider,
    Grid,
    InputAdornment,
    TextField,
    FormHelperText,
    RadioGroup,
    Radio,
    Typography,
    Switch,
    FormControl,
    FormControlLabel,
    FormGroup
} from '@material-ui/core';
// assets
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import LinkTwoToneIcon from '@material-ui/icons/LinkTwoTone';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import InputLabel from 'ui-component/extended/Form/InputLabel';
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
// ===========================|| Layouts ||=========================== //
function ConfigurableComponent({title}) {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard title={title}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={8}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
                                    <InputLabel horizontal>{title}</InputLabel>
                                </Grid>
                                <Grid item xs={12} sm={9} lg={6}>
                                    <TextField fullWidth placeholder="" />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
            <Grid item xs={12}>
                <MainCard title="Assessment Options ">
                    <Grid item xs={12} md={6}>
                        <SubCard title="Type of Assessment">
                            <Grid container spacing={2}>
                                <Grid item>
                                    <FormControl>
                                        <FormGroup row>
                                            <FormControlLabel control={<Switch defaultChecked />} label="New Case Management Client" />
                                            <FormControlLabel control={<Switch />} label="Existing Case Management Client" />
                                        </FormGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </MainCard>
            </Grid>
        </Grid>
    );
}

export default ConfigurableComponent;

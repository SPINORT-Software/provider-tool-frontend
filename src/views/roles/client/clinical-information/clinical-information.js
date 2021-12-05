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
import {gridSpacing} from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import MaskedInput from "react-text-mask";
import {useFormik} from "formik";
import JWTContext from "contexts/JWTContext";
import {useDispatch, useSelector} from "react-redux";


const ClinicalInformation = () => {
    const theme = useTheme();
    const userAuthContext = React.useContext(JWTContext)
    const clinicalInfoData = useSelector(state => state.client.clinicalInformation)
    const dispatch = useDispatch()
    const {
        user: {
            user_type_pk: clientUUID
        }
    } = userAuthContext;

    const formik = useFormik({
        initialValues: {},
        validate: values => {
            console.log(values)
        }
    });
    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>


                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={4}>
                            <MaskedInput
                                mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]}
                                className="form-control"
                                label="Date"
                                guide={false}
                                render={(ref, props) => <TextField fullWidth inputRef={ref} {...props}
                                                                   defaultValue=""/>}

                                defaultValue={formik.values.date}
                                onChange={formik.handleChange}
                                name='date'
                                id='date'
                                value={formik.values.date}
                            />
                        </Grid>
                    </Grid>


                </Grid>
            </Grid>
        </MainCard>
    );
};

export default ClinicalInformation;

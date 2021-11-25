import React from 'react';

// material-ui
import {CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import MaskedInput from 'react-text-mask';
import FileInput from '../../../common/file-input';
import {useDispatch, useSelector} from "react-redux";
import {
    setEmpReferralRequestForm,
    setFamiliarFacesSnatForm,
    setFamiliarFacesSdhForm,
    setCasePresentationForm
} from "store/actions/reviewBoard/referralActions";

const ReferralForms = () => {
    const dispatch = useDispatch();
    useSelector(state => state.reviewBoard.referrals.add.referralForms)

    return (<SubCard title='Referral Forms'>
        <CardContent>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={12} lg={12} md={12}>
                    <Grid container spacing={gridSpacing}>
                        <FileInput title='EMP Referral Request' setDocumentUUID={setEmpReferralRequestForm}
                                   fileType='TYPE_REVIEW_BOARD_REFERRAL'/>

                        <FileInput title='Familiar Faces - Social Needs Assessment Tool' setDocumentUUID={setFamiliarFacesSnatForm}
                                   fileType='TYPE_REVIEW_BOARD_REFERRAL'/>

                        <FileInput title='Familiar Faces - Screening Tool: Social Determinants of Health'
                                   fileType='TYPE_REVIEW_BOARD_REFERRAL'
                                   setDocumentUUID={setFamiliarFacesSdhForm}
                        />
                    </Grid>

                </Grid>
            </Grid>
        </CardContent>
    </SubCard>)
};

export default ReferralForms;

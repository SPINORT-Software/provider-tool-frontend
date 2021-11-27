import React from 'react';

// material-ui
import {CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import FileInput from "./file-input";

const AssessmentForms = ({generalAssessmentFormAction, documentType}) => (
    <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={12} lg={12} md={12}>
            <SubCard title='Assessment Forms'>
                <CardContent>
                    <Grid container spacing={gridSpacing}>
                        <FileInput title='EMP Progress Notes' setDocumentUUID={generalAssessmentFormAction}
                                   fileType={documentType}/>
                        <FileInput title='EMP Intake' setDocumentUUID={generalAssessmentFormAction}
                                   fileType={documentType}/>
                        <FileInput title='Safe Workplace Agreement' setDocumentUUID={generalAssessmentFormAction}
                                   fileType={documentType}/>
                        <FileInput title='Braden Scale' setDocumentUUID={generalAssessmentFormAction}
                                   fileType={documentType}/>
                        <FileInput title='Risk of Falls Assessment' setDocumentUUID={generalAssessmentFormAction}
                                   fileType={documentType}/>
                        <FileInput title='EMP Medication Profile' setDocumentUUID={generalAssessmentFormAction}
                                   fileType={documentType}/>
                        <FileInput title='Safe Use of Home Oxygen Patient Agreement'
                                   setDocumentUUID={generalAssessmentFormAction} fileType={documentType}/>
                        <FileInput title='Smoking Cessation Assessment' setDocumentUUID={generalAssessmentFormAction}
                                   fileType={documentType}/>
                        <FileInput title='Team Communication' setDocumentUUID={generalAssessmentFormAction}
                                   fileType={documentType}/>
                    </Grid>
                </CardContent>
            </SubCard>
        </Grid>
    </Grid>
);

export default AssessmentForms;

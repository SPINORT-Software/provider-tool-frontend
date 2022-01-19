import React from 'react';

// material-ui
import {CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import FileInput from "./file-input";

const AssessmentFormsCP = ({generalAssessmentFormAction, documentType}) => (
    <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={12} lg={12} md={12}>
            <SubCard title='Assessment Forms'>
                <CardContent>
                    <Grid container spacing={gridSpacing}>
                        <FileInput title='EMP Progress Notes' setDocumentUUID={generalAssessmentFormAction}
                                   fileType={documentType}/>
                        <FileInput title='Home Safety Checklist' setDocumentUUID={generalAssessmentFormAction}
                                   fileType={documentType}/>
                        <FileInput title='EMP Team Communication' setDocumentUUID={generalAssessmentFormAction}
                                   fileType={documentType}/>
                        <FileInput title='Initial Health Assessment Form' setDocumentUUID={generalAssessmentFormAction}
                                   fileType={documentType}/>
                        <FileInput title='SBAR Communication Form - Progress Notes' setDocumentUUID={generalAssessmentFormAction}
                                   fileType={documentType}/>
                    </Grid>
                </CardContent>
            </SubCard>
        </Grid>
    </Grid>
);

export default AssessmentFormsCP;

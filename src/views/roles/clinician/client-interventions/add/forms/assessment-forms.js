import React from 'react';

// material-ui
import {CardContent, Grid} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';
import SubCard from "ui-component/cards/SubCard";
import FileInput from "views/roles/common/file-input";
import {setInterventionFormUUID} from "store/actions/caseManager/clientInterventionActions";


const InterventionAssessmentForms = ({providerProfessionType}) => (
    <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={12}>
            <SubCard title='Assessment Forms'>
                <CardContent>
                    <Grid container spacing={gridSpacing}>
                        <FileInput title='EMP Progress Notes' setDocumentUUID={setInterventionFormUUID} fileType='TYPE_CASE_MANAGER_ASSESSMENT'/>

                        <FileInput title='Team Communication' setDocumentUUID={setInterventionFormUUID}
                                   fileType='TYPE_CASE_MANAGER_ASSESSMENT'/>
                    </Grid>
                </CardContent>
            </SubCard>
        </Grid>
    </Grid>
);

export default InterventionAssessmentForms;

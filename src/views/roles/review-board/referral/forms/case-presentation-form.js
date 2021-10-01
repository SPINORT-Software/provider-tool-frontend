import React from 'react';

// material-ui
import { CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField } from '@material-ui/core';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import MaskedInput from 'react-text-mask';

import FileInput from '../../../common/file-input';

const CasePresentationForm = () => (
    <SubCard title='Case Presentation Form'>
        <CardContent>
            <Grid container spacing={gridSpacing}>
                <FileInput title='Case Management Presentation Sheet' />
            </Grid>
        </CardContent>
    </SubCard>
);

export default CasePresentationForm;

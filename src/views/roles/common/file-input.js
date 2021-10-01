import React from 'react';

// material-ui
import { CardContent, Button, Checkbox, FormControlLabel, Grid, MenuItem, TextField } from '@material-ui/core';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import MaskedInput from 'react-text-mask';
import LayersTwoToneIcon from '@material-ui/icons/LayersTwoTone';

const FileInput = ({ title }) => (
    <Grid item xs={12} sm={12} lg={6} md={8}>
        <SubCard title={title}>
            <CardContent>
                <Button
                    variant='contained'
                    component='label'
                    startIcon={<LayersTwoToneIcon />}
                >
                    Upload File
                    <input
                        type='file'
                        hidden
                    />
                </Button>
            </CardContent>
        </SubCard>
    </Grid>
);

export default FileInput;

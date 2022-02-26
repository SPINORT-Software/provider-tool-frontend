import React from 'react';

// material-ui
import {Grid, MenuItem, TextField} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';

const typeOfTherapeuticInterventionList = [
    {
        value: 'therapeutic-intervention-type-admin-tasks',
        label: 'Case-Specific Administrative Tasks (e.g., charting, progress notes, team communication, emails, discharge plans, medication updates, review shared care plan, etc.)'
    },
    {
        value: 'therapeutic-intervention-type-delivery-of-supplies',
        label: 'Delivery and/or pick up of Extra-Mural Program supplies or equipment'
    },
    {
        value: 'therapeutic-intervention-type-bereavement-visit',
        label: 'Bereavement visit to a significant other'
    },
    {
        value: 'therapeutic-intervention-type-case-conferences',
        label: 'Case Conferences'
    },
    {
        value: 'therapeutic-intervention-type-other',
        label: 'Other'
    },

];

const TypeOfTherapeuticInterventions = ({value, onChangeHandler, id}) => (
    <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={12}>
            <TextField id={id} name={id} select label='Mode of Therapeutic Intervention'
                       value={value} fullWidth onChange={onChangeHandler}>
                {typeOfTherapeuticInterventionList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </Grid>
    </Grid>
);

export default TypeOfTherapeuticInterventions;

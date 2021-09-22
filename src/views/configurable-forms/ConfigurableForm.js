import * as React from 'react';

// material-ui
import {Checkbox, Divider, FormControlLabel, Grid, Typography, TextField} from '@material-ui/core';
import {connect} from 'react-redux';
import * as actions from 'store/actions';
import {fetchSectionAttributes} from "store/actions";


/*
This component servers as a page content for any user section attribute group.
All the fields will be fetched under the attribute group and iterated to display in this component.
 */
const getFieldByType = (attributeItem) => {
    // eslint-disable-next-line camelcase
    const {frontend_input} = attributeItem;

    // eslint-disable-next-line camelcase
    switch(frontend_input){
        case 'input_textbox':
            return <TextField required id={attributeItem.attribute_id} name={attributeItem.attribute_code}
                              label={attributeItem.frontend_label} fullWidth
                              autoComplete="given-name"/>

        case 'input_number':
            return <TextField type="number" required id={attributeItem.attribute_id} name={attributeItem.attribute_code}
                              label={attributeItem.frontend_label} fullWidth
                              autoComplete="given-name"/>

        case 'input_date':
            return <TextField type="number" required id={attributeItem.attribute_id} name={attributeItem.attribute_code}
                              label={attributeItem.frontend_label} fullWidth
                              autoComplete="given-name"/>
        default:
            return <TextField required id={attributeItem.attribute_id} name={attributeItem.attribute_code}
                              label={attributeItem.frontend_label} fullWidth
                              autoComplete="given-name"/>
    }
}

const makeFields = (attributes) => attributes.map(attributeItem => (
    <Grid item xs={10} sm={6} lg={12}>
        <Grid container spacing={3}>
            <Grid item xs={10} sm={6} lg={5}>
                {getFieldByType(attributeItem)}
            </Grid>
        </Grid>
    </Grid>
))

const makeGroupFields = (childAttributeGroups) => Object.keys(childAttributeGroups).map(childGroupKey => {
    // eslint-disable-next-line camelcase
    const {group_detail, attributes} = childAttributeGroups[childGroupKey];

    return (<Grid container mb={1} spacing={5}>
        <Grid item xs={12}>
            <Typography variant="h5" component="div" sx={{mb: 3}}>
                {group_detail.attribute_group_name}
            </Typography>
            <Grid container spacing={3} alignItems="center">
                {makeFields(attributes)}
            </Grid>
        </Grid>
        <Grid item xs={12}>
            <Divider/>
        </Grid>
    </Grid>)
})


const makeElements = (groupData) => {
    const {childAttributeGroups, defaultAttributes} = groupData;

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
                {makeGroupFields(childAttributeGroups)}
            </Grid>

            <Grid item xs={12} lg={12}>
                <Grid container spacing={3}>
                    {makeFields(defaultAttributes)}
                </Grid>
            </Grid>
        </Grid>
    )
}

function ConfigurableForm({sectionData, fetchSectionAttributes, groupData}) {
    return makeElements(groupData);
}

const mapStateToProps = state => ({
    sectionData: state.sectionForm
})

const mapDispatchToProps = dispatch => ({
    fetchSectionAttributes: () => dispatch(actions.fetchSectionAttributes())
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurableForm)

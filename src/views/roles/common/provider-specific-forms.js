import React from 'react';

// material-ui
import {CardContent, Checkbox, FormControlLabel, Grid, MenuItem, TextField} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import ProviderGenericForm from './provider-specific-forms/generic-form';
import FileInput from "./file-input";



const ProviderSpecificForms = ({providerSpecificFormAction, documentType}) => {

    // TODO : Get PROVIDER_TYPE value from user profile
    const PROVIDER_TYPE = 'PROVIDER_TYPE_NUTRITIONIST'

    const getProviderTypeComponent = providerType => {
        const providerSpecificForms = {
            'PROVIDER_TYPE_NUTRITIONIST':
                <ProviderGenericForm>
                    <FileInput title='Clinical Nutrition Assessment'
                               setDocumentUUID={providerSpecificFormAction}
                               fileType={documentType}/>
                </ProviderGenericForm>,
            'PROVIDER_TYPE_OCCUPATIONAL_THERAPIST':
                <ProviderGenericForm>
                    <FileInput title='Occupational Therapy Assessment'
                               setDocumentUUID={providerSpecificFormAction}
                               fileType={documentType}/>
                </ProviderGenericForm>,
            'PROVIDER_TYPE_PHYSICAL_THERAPIST':
                <ProviderGenericForm>
                    <FileInput title='Physiotherapy Assessment'
                               setDocumentUUID={providerSpecificFormAction}
                               fileType={documentType}/>
                </ProviderGenericForm>,
            'PROVIDER_TYPE_REGISTERED_NURSE': false,
            'PROVIDER_TYPE_RESPIRATORY_THERAPIST':
                <ProviderGenericForm>
                    <FileInput title='Respiratory Assessment'
                               setDocumentUUID={providerSpecificFormAction}
                               fileType={documentType}/>
                </ProviderGenericForm>,
            'PROVIDER_TYPE_SOCIAL_WORKER': false,
            'PROVIDER_TYPE_SPEECH_LANGUAGE_THERAPIST':
                <ProviderGenericForm>
                    <FileInput title='Speech-Language Pathology Adult Assessment'
                               setDocumentUUID={providerSpecificFormAction}
                               fileType={documentType}/>
                </ProviderGenericForm>
        }

        return providerSpecificForms[providerType];
    }

    return (<Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={12} lg={12} md={12}>
            <SubCard title='Provider Specific Assessment Forms'>
                <CardContent>
                    <div>
                        {getProviderTypeComponent(PROVIDER_TYPE)}
                    </div>
                </CardContent>
            </SubCard>
        </Grid>
    </Grid>)
};

export default ProviderSpecificForms;

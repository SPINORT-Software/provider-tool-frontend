import React from 'react';

// material-ui
import {CardContent, Button, Checkbox, FormControlLabel, Grid, MenuItem, TextField} from '@material-ui/core';

// project imports
import {gridSpacing} from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import MaskedInput from 'react-text-mask';
import LayersTwoToneIcon from '@material-ui/icons/LayersTwoTone';
import {useDispatch, useSelector} from "react-redux";
import commonApi from "store/api-calls/common";

// Upload Document using Document API and set the document UUID using dispatch

const FileInput = ({title, setDocumentUUID, fileType}) => {
    /*
    * setDocumentUUID is a generic function.
    * It is passed as parameter by the parent component.
    * fileType - Type of the File to add a Document Object ( Document Add API )
    * */

    const dispatch = useDispatch();

    /*
     * 1. Generic Upload function to create document object in Database
     * 2. Document object returns UUID of the instance and stored to reducer.
     * 3. UUID is added to reducer using dispatch Action sent as a prop to this component.
     * @param event
     * @returns {Promise<void>}
     */
    const uploadFile = async event => {
        try {
            const file = event.currentTarget.files[0];
            const response = await commonApi.uploadDocument(file, fileType);

            if (response.status === 200) {
                const documentUUID = response.data.document_id
                dispatch(setDocumentUUID(documentUUID))
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (<Grid item xs={12} sm={12} lg={4} md={8}>
        <SubCard title={title}>
            <CardContent>
                <Button
                    variant='contained'
                    component='label'
                    startIcon={<LayersTwoToneIcon/>}
                >
                    Upload File
                    <input
                        type='file'
                        onChange={event => uploadFile(event)}
                        hidden
                    />
                </Button>
            </CardContent>
        </SubCard>
    </Grid>)
};

export default FileInput;

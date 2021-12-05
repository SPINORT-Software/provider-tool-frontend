import React from 'react';

// material-ui
import {
    CardContent,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    MenuItem,
    TextField,
    List,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';


import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';

// project imports
import {gridSpacing} from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import MaskedInput from 'react-text-mask';
import LayersTwoToneIcon from '@material-ui/icons/LayersTwoTone';
import {useDispatch, useSelector} from "react-redux";
import commonApi from "store/api-calls/common";
import ProgressCircularControlled from "../../ui/ProgressCircularControlled";
import {SNACKBAR_OPEN} from "store/actionTypes";
import ListItemButton from "@material-ui/core/ListItemButton";

// Upload Document using Document API and set the document UUID using dispatch

const FileInput = ({title, setDocumentUUID, fileType}) => {
    /*
    * setDocumentUUID is a generic function.
    * It is passed as parameter by the parent component.
    * fileType - Type of the File to add a Document Object ( Document Add API )
    * */
    const [progressLoader, setProgressLoader] = React.useState(false);
    const [uploadedDocumentData, setUploadedDocumentData] = React.useState({});
    const [uploadedDocumentDisplayHidden, setUploadedDocumentDisplayHidden] = React.useState(true);

    const dispatch = useDispatch();
    // const uploadedDocuments = useSelector(store => store.caseManager.clientAssessment.add.assessment.uploaded_documents)

    /*
     * 1. Generic Upload function to create document object in Database
     * 2. Document object returns UUID of the instance and stored to reducer.
     * 3. UUID is added to reducer using dispatch Action sent as a prop to this component.
     * @param event
     * @returns {Promise<void>}
     */
    const uploadFile = async event => {
        try {
            setProgressLoader(true)
            const file = event.currentTarget.files[0];
            const response = await commonApi.uploadDocument(file, fileType);

            if (response.status === 200) {
                const {document_id: documentUUID, name: documentName, uploaded_at: uploadTime} = response.data
                dispatch(setDocumentUUID(documentUUID))
                setUploadedDocumentData(response.data)
                setUploadedDocumentDisplayHidden(false)

                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'File successfully uploaded.',
                    variant: 'alert',
                    alertSeverity: 'success', // error , success, warning
                    anchorOrigin: {vertical: 'bottom', horizontal: 'right'},  // vertical - top, bottom, // horizontal - left, center, right
                    transition: 'SlideUp', // SlideRight, SlideUp, SlideDown, Grow, SlideLeft, Fade
                    close: false
                })
            }
        } catch (e) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'File could not be uploaded. Please try again',
                variant: 'alert',
                alertSeverity: 'error', // error , success, warning
                anchorOrigin: {vertical: 'bottom', horizontal: 'right'},  // vertical - top, bottom, // horizontal - left, center, right
                transition: 'SlideUp', // SlideRight, SlideUp, SlideDown, Grow, SlideLeft, Fade
                close: false
            })
        }
        setProgressLoader(false)
    }

    return (<Grid item xs={12} sm={12} lg={4} md={8}>
        <SubCard title={title} secondary={<ProgressCircularControlled display={progressLoader}/>}>
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

                <List hidden={uploadedDocumentDisplayHidden}>
                    <ListItemButton>
                        <ListItemIcon>
                            <DescriptionTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                        </ListItemIcon>
                        <ListItemText primary={uploadedDocumentData.name} secondary={uploadedDocumentData.uploaded_at} />
                    </ListItemButton>
                </List>
            </CardContent>
        </SubCard>
    </Grid>)
};

export default FileInput;

import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles, useTheme } from '@material-ui/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';

// assets
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// style constant
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    }
}));

// ===========================|| ACCORDION ||=========================== //

const Accordion = ({ data, defaultExpandedId, expandIcon, square, toggle }) => {
    const classes = useStyles();
    const theme = useTheme();

    const [expanded, setExpanded] = React.useState(null);

    const handleChange = (panel) => (event, newExpanded) => toggle && setExpanded(newExpanded ? panel : false);

    React.useEffect(() => {
        setExpanded(defaultExpandedId);
    }, [defaultExpandedId]);

    return (
        <div className={classes.root}>
            {data &&
                data.map((item) => (
                    <MuiAccordion
                        key={item.id}
                        defaultExpanded={!item.disabled && item.defaultExpand}
                        expanded={(!toggle && !item.disabled && item.expanded) || (toggle && expanded === item.id)}
                        disabled={item.disabled}
                        square={square}
                        onChange={handleChange(item.id)}
                        sx={{
                            ':before': {
                                opacity: 0
                            },
                            '&.Mui-expanded': {
                                margin: 0
                            }
                        }}
                    >
                        <MuiAccordionSummary
                            expandIcon={expandIcon || expandIcon === false ? expandIcon : <ExpandMoreIcon />}
                            sx={{
                                color: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[800],
                                fontWeight: 500,
                                borderBottom: '1px solid',
                                borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 28 : theme.palette.grey[200]
                            }}
                        >
                            {item.title}
                        </MuiAccordionSummary>
                        <MuiAccordionDetails sx={{ p: '16px 8px' }}>{item.content}</MuiAccordionDetails>
                    </MuiAccordion>
                ))}
        </div>
    );
};

Accordion.propTypes = {
    data: PropTypes.array,
    defaultExpandedId: PropTypes.string,
    expandIcon: PropTypes.object,
    square: PropTypes.bool,
    toggle: PropTypes.bool
};

export default Accordion;

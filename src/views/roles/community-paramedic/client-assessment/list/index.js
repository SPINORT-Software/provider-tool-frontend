import PropTypes from 'prop-types';
import * as React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {listReferralsByReviewBoardID} from 'store/actions/reviewBoard/referralActions';
import {useNavigate} from 'react-router-dom';

// material-ui
import {makeStyles, useTheme} from '@material-ui/styles';
import {
    CardContent,
    Checkbox,
    Fab,
    Grid,
    IconButton,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    Toolbar,
    Tooltip,
    Typography
} from '@material-ui/core';
import {visuallyHidden} from '@material-ui/utils';

// third-party
import clsx from 'clsx';

// project imports

import MainCard from 'ui-component/cards/MainCard';

// assets
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterListTwoTone';
import PrintIcon from '@material-ui/icons/PrintTwoTone';
import FileCopyIcon from '@material-ui/icons/FileCopyTwoTone';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/AddTwoTone';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import {useContext, useEffect} from "react";

// axios api
import caseManagerApi from 'store/api-calls/case-manager';
import JWTContext from "contexts/JWTContext";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import {listCaseManagerClientAssessment} from "store/actions/caseManager/clientAssessmentActions";

// table data
function createData(id, name, category, price, date, qty) {
    return {id, name, category, price, date, qty};
}

// table sort
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// table header options
const headCells = [
    {
        id: 'assessment_date',
        numeric: false,
        label: 'Assessment Date',
        align: 'center'
    },
    {
        id: 'assessment_client',
        numeric: false,
        label: 'Client',
        align: 'left'
    },
    {
        id: 'client_status',
        numeric: false,
        label: 'Client Status',
        align: 'left'
    },
    {
        id: 'assessment_type',
        numeric: false,
        label: 'Assessment Type',
        align: 'left'
    },
];

// style const
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: 750
    },
    sortSpan: visuallyHidden
}));

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1)
    },
    highlight: {
        color: theme.palette.secondary.main
    },
    title: {
        flex: '1 1 100%'
    }
}));

// ===========================|| TABLE HEADER ||=========================== //

function EnhancedTableHead({classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, theme,
                               selected }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {numSelected > 0 && (
                    <TableCell padding="none" colSpan={7}>
                        <EnhancedTableToolbar numSelected={selected.length}/>
                    </TableCell>
                )}
                {numSelected <= 0 &&
                headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span
                                    className={classes.sortSpan}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                {numSelected <= 0 && (
                    <TableCell sortDirection={false} align="center" sx={{pr: 3}}>
                        <Typography
                            variant="subtitle1"
                            sx={{color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : 'grey.900'}}
                        >
                            Action
                        </Typography>
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    theme: PropTypes.object,
    selected: PropTypes.array,
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

// ===========================|| TABLE HEADER TOOLBAR ||=========================== //

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const {numSelected} = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="h4" component="div">
                    {numSelected} Selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Nutrition
                </Typography>
            )}

            {numSelected > 0 && (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon fontSize="small"/>
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};

// ===========================|| PRODUCT LIST ||=========================== //

const ReviewBoardReferralList = () => {
    const userAuthContext = React.useContext(JWTContext)
    const {
        user: {
            user_type_pk: caseManagerUUID
        }
    } = userAuthContext;

    const navigate = useNavigate();
    const reviewBoardRedux = useSelector(state => state.reviewBoard)
    const dispatch = useDispatch();

    const classes = useStyles();
    const theme = useTheme();

    // show a right sidebar when clicked on new product
    const [open, setOpen] = React.useState(false);
    const handleClickOpenDialog = () => {
        navigate('/cp/assessment/add');
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [search, setSearch] = React.useState('');
    const [rows, setRows] = React.useState([]);
    const [rowsInitial, setRowsInitial] = React.useState([]);

    const handleSearch = (event) => {
        const newString = event.target.value;
        setSearch(newString);

        if (newString) {
            const newRows = rows.filter((row) => {
                let matches = true;

                const properties = ['assessment_date', 'client_fullname'];
                let containsQuery = false;

                properties.forEach((property) => {
                    if (row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
                        containsQuery = true;
                    }
                });

                if (!containsQuery) {
                    matches = false;
                }
                return matches;
            });
            setRows(newRows);
        } else {
            setRows(rowsInitial);
        }
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelectedId = rows.map((n) => n.name);
            setSelected(newSelectedId);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, workloadUUID) => {
        navigate(`/assessment/${workloadUUID}`)
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const fetchListData = async () => {
        const response = await caseManagerApi.listClientAssessmentByCaseManagerID(caseManagerUUID);
        if ('result' in response && response.result === true) {
            setRows(response.data)
            setRowsInitial(response.data)
            dispatch(listCaseManagerClientAssessment(response.data))
        }
    }

    useEffect(() => {
        fetchListData()
    }, [])

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <MainCard title="My Client Assessments" content={false}>
            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={8} sm={6}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small"/>
                                    </InputAdornment>
                                )
                            }}
                            onChange={handleSearch}
                            placeholder="Search Workload"
                            value={search}
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
                        <Tooltip title="Copy">
                            <IconButton>
                                <FileCopyIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Print">
                            <IconButton>
                                <PrintIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Filter">
                            <IconButton>
                                <FilterListIcon/>
                            </IconButton>
                        </Tooltip>

                        {/* product add & dialog */}
                        <Tooltip title="Add Assessment">
                            <Fab
                                color="primary"
                                size="small"
                                onClick={handleClickOpenDialog}
                                sx={{boxShadow: 'none', ml: 1, width: '32px', height: '32px', minHeight: '32px'}}
                            >
                                <AddIcon fontSize="small"/>
                            </Fab>
                        </Tooltip>

                    </Grid>
                </Grid>
            </CardContent>

            {/* table */}
            <TableContainer>
                <Table className={classes.table} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        theme={theme}
                        selected={selected}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={index}
                                    >

                                        <TableCell
                                            component="th"
                                            align="center"
                                            id={labelId}
                                            scope="row"
                                            sx={{cursor: 'pointer'}}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : 'grey.900'}}
                                            >
                                                {' '}
                                                {row.assessment_date}{' '}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            component="th"
                                            align="left"
                                            id={labelId}
                                            scope="row"
                                            sx={{cursor: 'pointer'}}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : 'grey.900'}}
                                            >
                                                {' '}
                                                {row?.client_fullname}{' '}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            component="th"
                                            align="left"
                                            id={labelId}
                                            scope="row"
                                            sx={{cursor: 'pointer'}}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : 'grey.900'}}
                                            >
                                                {' '}
                                                {row?.client_status}{' '}
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            component="th"
                                            align="left"
                                            id={labelId}
                                            scope="row"
                                            sx={{cursor: 'pointer'}}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : 'grey.900'}}
                                            >
                                                {' '}
                                                {row?.assessment_status}{' '}
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="center" sx={{pr: 3}}>
                                            <IconButton
                                                color="primary"
                                                onClick={(event) => handleClick(event, row.client_assessment_id)}
                                            >
                                                <VisibilityTwoToneIcon sx={{fontSize: '1.3rem'}}/>
                                            </IconButton>
                                            <IconButton color="secondary">
                                                <EditTwoToneIcon sx={{fontSize: '1.3rem'}}/>
                                            </IconButton>
                                        </TableCell>


                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows
                                }}
                            >
                                <TableCell colSpan={6}/>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* table pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
};

export default ReviewBoardReferralList;

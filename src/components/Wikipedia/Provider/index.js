import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import TableHead from "../TableHead";

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === "desc" ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        maxWidth: 1200,
        margin: "0 auto"
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: "auto",
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    name: {
        minWidth: 120
    }
});

class Provider extends React.Component {
    render() {
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.props;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <TextField
                    id="outlined-search"
                    label="Search field"
                    type="search"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    defaultValue={this.props.defaultQuery}
                    onKeyUp={this.props.searchInput}
                />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <TableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.props.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(row => {
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.props.handleRowClick(event, row)}
                                            role="checkbox"
                                            aria-checked={row.checked}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={row.checked}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={row.checked} />
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none" className={classes.name}>
                                                {row.name}
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none">
                                                {row.description}
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none">
                                                <Button
                                                    href={row.link}
                                                    className={classes.button}
                                                    target="_blank"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    Link
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        "aria-label": "Previous Page",
                    }}
                    nextIconButtonProps={{
                        "aria-label": "Next Page",
                    }}
                    onChangePage={this.props.handleChangePage}
                    onChangeRowsPerPage={this.props.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

export default withStyles(styles)(Provider);

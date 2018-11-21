import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";

const styles = () => ({
    name: {
        minWidth: 135,
        paddingLeft: 15
    }
});

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy, classes } = this.props;
        const cols = [
            { id: "name", numeric: false, disablePadding: true, label: "Page name" },
            { id: "description", numeric: false, disablePadding: true, label: "Description" },
            { id: "link", numeric: false, disablePadding: true, label: "URL" },
        ];

        return (
            <TableHead>
                <TableRow>
                    {this.props.type !== "favorites" &&
                        <TableCell />
                    }
                    {cols.map((row, index) => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? "none" : "default"}
                                sortDirection={orderBy === row.id ? order : false}
                                className={this.props.type === "favorites" && index === 0 ? classes.name : ""}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? "bottom-end" : "bottom-start"}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

export default withStyles(styles)(EnhancedTableHead);



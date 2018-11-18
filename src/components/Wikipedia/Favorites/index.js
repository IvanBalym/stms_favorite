import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import TableHead from "../TableHead";

const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto",
        maxWidth: 1200,
        margin: "0 auto"
    },
    table: {
        minWidth: 700,
    },
    name: {
        minWidth: 135,
        paddingLeft: 15
    }
});

class Favorites extends Component {
    render() {
        const { classes, favoriteLocal } = this.props;

        return (
            <div>
                <Paper className={classes.root}>
                <Table className={classes.table}>
                <TableHead type={"favorites"}/>
                <TableBody>
                {favoriteLocal.map(favorites => {
                    return (
                        <TableRow key={favorites.id}>
                            <TableCell className={classes.name} component="th" scope="row" padding="none">
                                {favorites.name}
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                                {favorites.description}
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                                <Button
                                    href={favorites.link}
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
                </TableBody>
                </Table>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Favorites);

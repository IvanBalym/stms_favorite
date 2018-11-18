import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: "none",
    },
    link: {
        textDecoration: "none"
    }
});

class Menu extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Link to="/list" className={classes.link}>
                    <Button variant="contained" color="secondary" className={classes.button}>
                        List
                    </Button>
                </Link>
                <Link to="/favorites" className={classes.link}>
                    <Button variant="contained" color="secondary" className={classes.button}>
                        Favorites
                    </Button>
                </Link>
            </div>
        );
    }
}

export default withStyles(styles)(Menu);

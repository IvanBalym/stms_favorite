import React, { Component } from "react";
import Provider from "../../components/Wikipedia/Provider";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from "../../actions";


class ProviderContainer extends Component {
    componentDidMount() {
        this.props.handleSearch(this.props.defaultSearch);
    }

    render() {
        return (
            <div>
                <Provider
                    {...this.props}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.data,
        page: state.page,
        order: state.order,
        orderBy: state.orderBy,
        defaultSearch: state.defaultSearch,
        loading: state.loading,
        rowsPerPage: state.rowsPerPage,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleSearch: bindActionCreators(
            action.handleSearch,
            dispatch
        ),
        handleRowClick: bindActionCreators(
            action.handleRowClick,
            dispatch
        ),
        handleChangeRowsPerPage: bindActionCreators(
            action.handleChangeRowsPerPage,
            dispatch
        ),
        handleChangePage: bindActionCreators(
            action.handleChangePage,
            dispatch
        ),
        handleRequestSort: bindActionCreators(
            action.handleRequestSort,
            dispatch
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProviderContainer);

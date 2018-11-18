import React, { Component } from "react";
import Provider from "../../components/Wikipedia/Provider";

class ProviderContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultQuery: "Google",
            fetchedData: [],
            favorites: [],
            order: "asc",
            orderBy: "calories",
            selected: [],
            data: this.props.data,
            page: 0,
            rowsPerPage: 10,
        };

        this.search = this.search.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleRequestSort = this.handleRequestSort.bind(this);
    }

    componentDidMount() {
        this.search();
    }

    search(e) {
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const query = e ? e.target.value : this.state.defaultQuery;
        fetch(`${proxy}https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${query}&limit=max`)
            .then(res => res.json())
            .then(result => {
                    const favorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
                    const formattedResult = result[1].map((item, index) => {
                        let isFavorite = false;
                        for (let i = 0; favorites.length > i; i++) {
                            if (favorites[i].name === result[1][index]) {
                                isFavorite = true;
                            }
                        }

                        return {
                            id: index,
                            checked: isFavorite,
                            name: result[1][index],
                            description: result[2][index],
                            link: result[3][index]
                        }
                    });
                    this.setState({
                        fetchedData: formattedResult,
                        favorites: favorites
                    })
                },
                (error) => {
                    console.log(error);
                }
            )
            .catch(error => console.log("Error: " + error))
    }

    handleRowClick = (event, row) => {
        const favorites = this.state.favorites;
        let newData = [];

        for (let i = 0; this.state.fetchedData.length > i; i++) {
            if (this.state.fetchedData[i].name === row.name) {
                newData = this.state.fetchedData;
                newData[i] = {...row, checked: !row.checked};
            }
        }

        if (!row.checked) {
            favorites.push({...row, checked: true});
        } else if (row.checked) {
            for (let i = 0; favorites.length > i; i++) {
                if (favorites && favorites[i].name === row.name) {
                    favorites.splice(i, 1);
                }
            }
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));

        this.setState({
            favorites: favorites,
            fetchedData: newData
        });
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = "desc";

        if (this.state.orderBy === property && this.state.order === "desc") {
            order = "asc";
        }

        this.setState({ order, orderBy });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {
        return (
            <div>
                <Provider
                    {...this.state}
                    searchInput={this.search}
                    data={this.state.fetchedData}
                    defaultQuery={this.state.defaultQuery}
                    handleRowClick={this.handleRowClick}
                    handleRequestSort={this.handleRequestSort}
                    handleChangePage={this.handleChangePage}
                    handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </div>
        );
    }
}

export default ProviderContainer;

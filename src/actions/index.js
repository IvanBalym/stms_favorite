import * as constant from "../constants";

export const handleSearch = (query) => {
    return dispatch => {
        dispatch({ type: constant.SEARCH_LOAD });

        const proxy = "https://cors-anywhere.herokuapp.com/";
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
                    dispatch({
                        type: constant.SEARCH_SUCCESS,
                        payload: {formattedResult, favorites}
                    })
                },
                (error) => {
                    console.log(error);
                }
            )
            .catch(error => console.log("Error: " + error))
    }
};

export const handleRowClick = (row) => {
    return (dispatch, getState) => {
        const data = getState().data.map(item => {
            if (item.id === row.id) {
                item.checked = !item.checked;
            }
            return item
        });

        const favorites = [...getState().favorites];
        if (row.checked) {
            favorites.push({...row, checked: true});
        } else {
            for (let i = 0; favorites.length > i; i++) {
                if (favorites && favorites[i].name === row.name) {
                    favorites.splice(i, 1);
                }
            }
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));

        dispatch({
            type: constant.TABLE_ROW_CLICK,
            payload: {data, favorites}
        });

    }
};

export const handleChangeRowsPerPage = number => {
    return dispatch =>
        dispatch({
            type: constant.TABLE_ROWS_PER_PAGE,
            payload: number
        });
};

export const handleChangePage = (event, page) => {
    return dispatch =>
        dispatch({
            type: constant.TABLE_CHANGE_PAGE,
            payload: page
        });
};

export const handleRequestSort = (event, property) => {
    return (dispatch, getState) => {
        const orderBy = property;
        let order = "desc";

        if (getState().orderBy === property && getState().order === "desc") {
            order = "asc";
        }
        dispatch({
            type: constant.TABLE_SORT,
            payload: {order, orderBy}
        });
    }
};
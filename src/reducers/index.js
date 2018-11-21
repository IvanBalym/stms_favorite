import * as constant from "../constants";

export default function reducer(state = {}, action) {
    switch (action.type) {
        case constant.SEARCH_LOAD:
            return {
                ...state,
                loading: true
            };

        case constant.SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload.formattedResult,
                favorites: action.payload.favorites
            };

        case constant.TABLE_ROW_CLICK:
            return {
                ...state,
                data: action.payload.data,
                favorites: action.payload.favorites
            };

        case constant.TABLE_ROWS_PER_PAGE:
            return {
                ...state,
                rowsPerPage: action.payload
            };

        case constant.TABLE_CHANGE_PAGE:
            return {
                ...state,
                page: action.payload
            };

        case constant.TABLE_SORT:
            return {
                ...state,
                order: action.payload.order,
                orderBy: action.payload.orderBy,
            };

        default:
            return state;
    }
}
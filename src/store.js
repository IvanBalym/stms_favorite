import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from './reducers';

export default function configureStore(initialState={
    position: 0,
    data: [],
    defaultSearch: 'Google',
    rowsPerPage: 10,
    page: 0,
    order: "asc",
    orderBy: "calories",
    favorites: []
}) {
    return createStore(
        reducer,
        initialState,
        applyMiddleware(thunk)
    );
}
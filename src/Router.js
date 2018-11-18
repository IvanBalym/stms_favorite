import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ProviderContainer from './containers/Provider';
import FavoritesContainer from './containers/Favorites';

class RouterContainer extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={ProviderContainer} />
                <Route exact path="/list" component={ProviderContainer} />
                <Route exact path="/favorites" component={FavoritesContainer} />
            </div>
        );
    }
}

export default RouterContainer;

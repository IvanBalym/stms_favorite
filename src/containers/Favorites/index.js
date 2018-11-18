import React, { Component } from "react";
import Favorites from "../../components/Wikipedia/Favorites";

class FavoritesContainer extends Component {
    render() {
        const favoriteLocal = localStorage.getItem("favorites")?JSON.parse(localStorage.getItem("favorites")):[];
        return (
            <div>
                <Favorites favoriteLocal={favoriteLocal}/>
            </div>
        );
    }
}

export default FavoritesContainer;

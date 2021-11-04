import {combineReducers} from "redux";
import bookReducer from "./book.reducer";
import cartReducer from "./cart.reducer";

export default combineReducers ({
    books: bookReducer,
    carts: cartReducer
});

/* 
state = {
    books: {
        books: [],
        loading: false
    }
}
*/
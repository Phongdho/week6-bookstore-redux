import api from "../../apiService";
import * as types from "../constants/cart.constants"
import { toast } from "react-toastify";

const cartActions = {};

cartActions.addToCart = ({addingBookToCart}) => {
    return async (dispatch) => {
        dispatch({ type: types.POST_TO_CART_REQUEST})
        try {
            let url = `/cart`;
            const res = await api.post(url, addingBookToCart);
            toast.success("The book has been successfully added to your cart!");
            dispatch({ type: types.POST_TO_CART_SUCCESS })
        } catch (err) {
            console.log(err);
            dispatch({ type: types.POST_TO_CART_FAIL, payload: err.message})
        } 
    }
}

cartActions.getCart = () => {
    return async (dispatch) => {
        try {
            dispatch({type: types.GET_TO_CART_REQUEST});
            let url = `/cart`;
            const res = await api.get(url);
            dispatch ({type: types.GET_TO_CART_SUCCESS, payload: res.data});
        } catch (err) {
            console.log(err);
            dispatch ({type: types.GET_TO_CART_FAIL, payload: err.message});
        }
    };
};


cartActions.deleteCart = ({removedBookId}) => {
    return async (dispatch) => {
        dispatch({ type: types.DELETE_FROM_CART_REQUEST})
        try {
            let url = `/cart/${removedBookId}`;
            const res = await api.delete(url);
            toast.success("The book has been removed from your cart");
            dispatch(cartActions.getCart());
            dispatch({ type: types.DELETE_FROM_CART_SUCCESS })
        } catch (err) {
            console.log(err);
            dispatch({ type: types.DELETE_FROM_CART_FAIL})
        } 
    }
}

export default cartActions
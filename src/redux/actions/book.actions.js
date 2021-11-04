import api from "../../apiService";
import * as types from "../constants/book.constants"
import { toast } from "react-toastify";


const bookActions = {}

bookActions.getAllBooks = ({pageNum, limit, query}) => {
    return async (dispatch) => {
        //fetch api in here
        try {
            dispatch({ type: types.GET_ALL_BOOKS_REQUEST, payload: null})

            let url = `/books?_page=${pageNum}&_limit=${limit}`;
            if (query) url += `&q=${query}`;
            const res = await api.get(url);

            dispatch({ type: types.GET_ALL_BOOKS_SUCCESS, payload: res.data})

        } catch (err) {
            console.log(err);
            dispatch({ type: types.GET_ALL_BOOKS_FAIL, payload: err.message})
        }
    }
}

bookActions.getFavorites = () => {
    return async (dispatch) => {
        try {
            dispatch({type: types.GET_FAVORITE_BOOK_REQUEST});
            let url = `/favorites`;
            const res = await api.get(url);
            dispatch ({type: types.GET_FAVORITE_BOOK_SUCCESS, payload: res.data});
        } catch (err) {
            console.log(err);
            dispatch ({type: types.GET_FAVORITE_BOOK_FAIL, payload: err.message});
        }
    };
};

bookActions.getBookDetail = ({bookId}) => {
    return async (dispatch) => {
        try {
            dispatch({ type: types.GET_BOOK_DETAIL_REQUEST});
            const res = await api.get(`/books/${bookId}`);
            dispatch({ type: types.GET_BOOK_DETAIL_SUCCESS, payload: res.data});
        } catch (err) {
            console.log(err);
            dispatch({ type: types.GET_BOOK_DETAIL_FAIL})
        } 
    }
}

bookActions.addToFavorite = ({addingBook}) => {
    return async (dispatch) => {
        dispatch({ type: types.POST_BOOK_DETAIL_REQUEST})
        try {
            let url = `/favorites`;
            const res = await api.post(url, addingBook);
            toast.success("The book has been added to the reading list!");
            dispatch({ type: types.POST_BOOK_DETAIL_SUCCESS })
        } catch (err) {
            console.log(err);
            dispatch({ type: types.POST_BOOK_DETAIL_FAIL, payload: err.message})
        } 
    }
}

bookActions.deleteFavorite = ({removedBookId}) => {
    return async (dispatch) => {
        dispatch({ type: types.DELETE_FAVORITE_BOOK_REQUEST})
        try {
            let url = `/favorites/${removedBookId}`;
            const res = await api.delete(url);
            toast.success("The book has been removed from the reading list!");
            dispatch(bookActions.getFavorites());
            dispatch({ type: types.DELETE_FAVORITE_BOOK_SUCCESS })
        } catch (err) {
            console.log(err);
            dispatch({ type: types.DELETE_FAVORITE_BOOK_FAIL})
        } 
    }
}

export default bookActions
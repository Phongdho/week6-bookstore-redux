import * as types from "../constants/book.constants"

const initialState = {
    books: [],
    loading: false,
    errorMessage: "",
    favoriteBooks: [],
};

const bookReducer = (state=initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.GET_ALL_BOOKS_REQUEST:
            return {...state, loading: true, errorMessage:""};
        case types.GET_ALL_BOOKS_SUCCESS:
            return {...state, books: payload, loading: false};
        case types.GET_ALL_BOOKS_FAIL:
            return {...state, errorMessage: payload, loading: false};

        case types.GET_BOOK_DETAIL_REQUEST:
        case types.POST_BOOK_DETAIL_REQUEST:
        case types.GET_FAVORITE_BOOK_REQUEST:
        case types.DELETE_FAVORITE_BOOK_REQUEST:
            return {...state, loading: true};

        case types.GET_BOOK_DETAIL_SUCCESS:
            return {...state, books: payload, loading: false};

        case types.GET_FAVORITE_BOOK_SUCCESS:
            return {...state, favoriteBooks: payload, loading: false}

        case types.GET_BOOK_DETAIL_FAIL:
        case types.POST_BOOK_DETAIL_FAIL:
        case types.POST_BOOK_DETAIL_SUCCESS:
        case types.GET_FAVORITE_BOOK_FAIL:
        case types.DELETE_FAVORITE_BOOK_SUCCESS:
        case types.DELETE_FAVORITE_BOOK_FAIL:
             return {...state, loading: false};
        default:
            return state
    }
}

export default bookReducer;
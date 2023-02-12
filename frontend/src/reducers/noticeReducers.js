import { 
    ALL_NOTICE_REQUEST, 
    ALL_NOTICE_SUCCESS, 
    ALL_NOTICE_FAIL,
    NOTICE_DETAILS_REQUEST,
    NOTICE_DETAILS_SUCCESS,
    NOTICE_DETAILS_FAIL,
    CLEAR_ERRORS,
    CREATE_NOTICE_REQUEST,
    CREATE_NOTICE_SUCCESS,
    CREATE_NOTICE_FAIL
} from '../constants/noticeConstants'

export const noticesReducer = (state = { products: [] }, action) => {
    switch(action.type) {
        case CREATE_NOTICE_REQUEST:
            return {
                loading: true,
                isAuthenticated: true
            }

        case CREATE_NOTICE_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                notice: action.payload
            }
        case CREATE_NOTICE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case ALL_NOTICE_REQUEST:
            return {
                loading: true,
                products: []
            }

        case ALL_NOTICE_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount : action.payload.productsCount,
                resPerPage : action.payload.resPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
            }

        case ALL_NOTICE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const noticeDetailsReducer = (state = { product : {} }, action) => {
    switch(action.type) {

        case NOTICE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case NOTICE_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }

        case NOTICE_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}
import { useHistory } from 'react-router-dom'
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
    CREATE_NOTICE_FAIL,
    UPDATE_NOTICE_REQUEST,
    UPDATE_NOTICE_SUCCESS,
    UPDATE_NOTICE_FAIL,
    DELETE_NOTICE_FAIL,
    DELETE_NOTICE_SUCCESS,
    DELETE_NOTICE_REQUEST
} from '../constants/noticeConstants'

export const noticesReducer = (state = { notices: [] }, action) => {
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
                notices: []
            }

        case ALL_NOTICE_SUCCESS:
            return {
                loading: false,
                notices: action.payload.notices,
                noticesCount : action.payload.noticesCount,                
                resPerPage : action.payload.resPerPage,
                filteredProductsCount: action.payload.filteredNoticeCount
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

export const noticeDetailsReducer = (state = { notice : {} }, action) => {
    switch(action.type) {

        case NOTICE_DETAILS_REQUEST:
        case UPDATE_NOTICE_REQUEST:
        case DELETE_NOTICE_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case NOTICE_DETAILS_SUCCESS:
        case UPDATE_NOTICE_SUCCESS:
        case DELETE_NOTICE_SUCCESS:
            return {
                loading: false,
                notice: action.payload
            }

        case NOTICE_DETAILS_FAIL:
        case UPDATE_NOTICE_FAIL:
        case DELETE_NOTICE_FAIL:
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
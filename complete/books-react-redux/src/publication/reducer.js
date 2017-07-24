/**
 * Created by wallinsondeivesbatistalima on 23/07/17.
 */
import Actions from './actions';

const {
    FETCH_LIST_REQUEST,
    FETCH_LIST_SUCCESS,
    FETCH_LIST_FAILURE,
    FETCH_PUBLISHER_LIST_REQUEST,
    FETCH_PUBLISHER_LIST_SUCCESS,
    FETCH_PUBLISHER_LIST_FAILURE,
    FETCH_AUTHOR_LIST_REQUEST,
    FETCH_AUTHOR_LIST_SUCCESS,
    FETCH_AUTHOR_LIST_FAILURE,
    EDITING_ITEM_CHANGE,
    EDITING_ITEM_CANCEL,
    EDITING_ITEM_SAVE_REQUEST,
    EDITING_ITEM_SAVE_SUCCESS,
    EDITING_ITEM_SAVE_FAILURE,
    EDITING_ITEM_DELETE_REQUEST,
    EDITING_ITEM_DELETE_SUCCESS,
    EDITING_ITEM_DELETE_FAILURE,
    CURRENT_ITEM_SELECT,
    BEFORE_START_EDITING1_REQUEST,
    BEFORE_START_EDITING1_SUCCESS,
    BEFORE_START_EDITING1_FAILURE,
    BEFORE_START_EDITING2_REQUEST,
    BEFORE_START_EDITING2_SUCCESS,
    BEFORE_START_EDITING2_FAILURE,

} = Actions;

const reducer = (state = {
    publishers: [],
    author: [],
    publications: [],
    isFetching: false,
    message: '',
    editingItem: {
        year: '',
        title: '',
        author :{},
        publisher :{},
        type : 'BOOK'
    },
    isSaving: false,
}, action) => {
    switch (action.type) {
        case FETCH_LIST_REQUEST:
            return {
                ...state,

                isFetching: true,
            };
        case FETCH_LIST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                publications: action.pubs,
            };
        case FETCH_LIST_FAILURE:
            return {
                ...state,
                message: action.error,
                isFetching: false,
                publications: [],
            }
        case FETCH_AUTHOR_LIST_REQUEST:
            return {
                ...state,
                isFetching: true,
            }
        case FETCH_AUTHOR_LIST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                authors: action.authors,
            }
        case FETCH_AUTHOR_LIST_FAILURE:
            return {
                ...state,
                message: action.error,
                isFetching: false,
                authors: [],
            }
        case FETCH_PUBLISHER_LIST_REQUEST:
            return {
                ...state,
                isFetching: true,
            }
        case FETCH_PUBLISHER_LIST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                publishers: action.publishers,
            }
        case FETCH_PUBLISHER_LIST_FAILURE:
            return {
                ...state,
                message: action.error,
                isFetching: false,
                publishers: [],
            }
        case BEFORE_START_EDITING1_REQUEST:
            return {
                ...state,
                isFetching: true,
                editingItem : {auhtor : {}},
                message : ''
            }

        case BEFORE_START_EDITING1_SUCCESS:
            return {
                ...state,
                isFetching: false,
                editingItem : action.item,
                message : ''
            }
        case BEFORE_START_EDITING1_FAILURE:
            return {
                ...state,
                isFetching: false,
                editingItem : {auhtor : {}},
                message : ''
            }
        case BEFORE_START_EDITING2_REQUEST:
            return {
                ...state,
                isFetching: true,
                editingItem : {publisher : {}},
                message : ''
            }

        case BEFORE_START_EDITING2_SUCCESS:
            return {
                ...state,
                isFetching: false,
                editingItem : action.item,
                message : ''
            }
        case BEFORE_START_EDITING2_FAILURE:
            return {
                ...state,
                isFetching: false,
                editingItem : {publisher : {}},
                message : ''
            }
        case CURRENT_ITEM_SELECT:
            return {
                ...state,
                isEditing : true,
                editingItem: action.item,
                message : ''
            };
        case EDITING_ITEM_CHANGE:
            return {
                ...state,
                editingItem: action.item,
                message : ''
            };
        case EDITING_ITEM_CANCEL:
            return{
                ...state,
                isEditing : false,
                editingItem: {year: '', title: '', year:'', title: '', author:{},publisher:{}},
                message : 'Changes not saved'
            }
        case EDITING_ITEM_SAVE_REQUEST:
            return {
                ...state,
                isSaving: true,
                editingItem : {year:'', title: '', author:{},publisher:{}},
                message : ''
            }

        case EDITING_ITEM_SAVE_SUCCESS:
            return {
                ...state,
                isSaving: false,
                message: 'Item saved!'
            }
        case EDITING_ITEM_SAVE_FAILURE:
            return {
                ...state,
                isSaving: false,
                message: action.error,
            }

        case EDITING_ITEM_DELETE_REQUEST:
            return {
                ...state,
                isSaving: false,
                editingItem : {year:'', title: '', author:{},publisher:{}},
                isEditing: false,
                message : ''
            }
        case EDITING_ITEM_DELETE_SUCCESS:
            return {
                ...state,
                message : 'Item Deleted',
            }
        case EDITING_ITEM_DELETE_FAILURE:
            return {
                ...state,
                message : action.error,
            }
        default:
            return state;
    }
};

export default reducer;
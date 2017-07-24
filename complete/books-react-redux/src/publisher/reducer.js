/**
 * Created by wallinsondeivesbatistalima on 23/07/17.
 */
import Actions from './actions';

const {
    FETCH_LIST_REQUEST,
    FETCH_LIST_SUCCESS,
    FETCH_LIST_FAILURE,
    EDITING_ITEM_CHANGE,
    EDITING_ITEM_CANCEL,
    EDITING_ITEM_SAVE_REQUEST,
    EDITING_ITEM_SAVE_SUCCESS,
    EDITING_ITEM_SAVE_FAILURE,
    EDITING_ITEM_DELETE_REQUEST,
    EDITING_ITEM_DELETE_SUCCESS,
    EDITING_ITEM_DELETE_FAILURE,
    CURRENT_ITEM_SELECT,
    LOAD_ITEM_PUBLICATIONS_FAILURE,
    LOAD_ITEM_PUBLICATIONS_SUCCESS,
    LOAD_ITEM_PUBLICATIONS_REQUEST,
} = Actions;

const reducer = (state = {
    publishers: [],
    publications : [],
    isFetching: false,
    message: '',
    currentItem: {},
    editingItem: {
        name: '',
        location: '',
    },
    selectedItem : {
        name : 'Select an item'
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
                publishers: action.publishers,
            };
        case FETCH_LIST_FAILURE:
            return {
                ...state,
                message: action.error,
                isFetching: false,
                publishers: [],
            }
        case CURRENT_ITEM_SELECT:
            return {
                ...state,
                isEditing : true,
                currentItem: action.item,
                editingItem: action.item,
            };
        case EDITING_ITEM_CHANGE:
            return {
                ...state,
                editingItem: action.item,
            };
        case EDITING_ITEM_CANCEL:
            return{
                ...state,
                isEditing : false,
                editingItem: {name:'',location:''},
                message : 'Changes not saved'
            }
        case EDITING_ITEM_SAVE_REQUEST:
            return {
                ...state,
                isSaving: true,
                currentItem : {name:'',location:''},
                editingItem : {name:'',location:''},
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
                currentItem : {name:'',location:''},
                editingItem : {name:'',location:''},
                isEditing: false,
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
        case LOAD_ITEM_PUBLICATIONS_FAILURE:
            return {
                ...state,
                message : action.error,
                publications : [],
                isFetching: false,
            }
        case LOAD_ITEM_PUBLICATIONS_SUCCESS:
            return {
                ...state,
                publications: action.publications,
                isFetching: false,

            }
        case LOAD_ITEM_PUBLICATIONS_REQUEST:
            return {
                ...state,
                message : '',
                publications: [],
                selectedItem : action.item,
                isFetching: true,
            }
        default:
            return state;
    }
};

export default reducer;
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

const fetchAuthorList = () => (dispatch, getState) => {
    dispatch({ type: FETCH_LIST_REQUEST });

    fetch('http://localhost:8080/authors', {
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.json())
        .then(({ _embedded }) => {
            const authors = _embedded.authors
                .map(a => ({ ...a, id: parseInt(a._links.self.href.replace('http://localhost:8080/authors/','')) }));
            dispatch({
                authors,
                type: FETCH_LIST_SUCCESS,
            });
        })
        .catch(() => dispatch({
            type: FETCH_LIST_FAILURE,
            error: 'There was a problem loading the data',
        }));
};

const changeEditingItem = item => ({
    item,
    type: EDITING_ITEM_CHANGE,
});

const cancelEditingItem = () => ({ type: EDITING_ITEM_CANCEL });

const saveEditingItem = item => (dispatch, getState) => {
    dispatch({type : EDITING_ITEM_SAVE_REQUEST});
    if (getState.isEditing && item.firstName != '' && item.lastName != '') {
        fetch('http://localhost:8080/authors/' + item.id, {
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            method: "PUT",
            body: JSON.stringify(item),
        }).then(response => response.json())
            .then(() => {

                dispatch({
                    type: EDITING_ITEM_SAVE_SUCCESS,
                });
                dispatch(fetchAuthorList());
            })
            .catch(() => dispatch({
                type: EDITING_ITEM_SAVE_FAILURE,
                error: 'There was a problem saving the data',
            }));
    } else if (item.firstName != '' && item.lastName != '') {
        fetch('http://localhost:8080/authors/', {
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify(item),
        }).then(response => response.json())
            .then(() => {

                dispatch({
                    type: EDITING_ITEM_SAVE_SUCCESS,
                });
                dispatch(fetchAuthorList());
            })
            .catch(() => dispatch({
                type: EDITING_ITEM_SAVE_FAILURE,
                error: 'There was a problem saving the data',
            }));
    }




};

const deleteEditingItem = item => (dispatch, getState) => {
    dispatch({type: EDITING_ITEM_DELETE_REQUEST});
    fetch('http://localhost:8080/authors/'+item.id,{
        mode: 'cors',
        method: "DELETE",
    }).then(() => {

            dispatch({
                type: EDITING_ITEM_DELETE_SUCCESS,
            });
            dispatch(fetchAuthorList());
        })
        .catch(() => dispatch({
            type: EDITING_ITEM_DELETE_FAILURE,
            error: 'There was a problem deleting the data',
        }));
}

const startEditing = item => ({
    item,
    type: CURRENT_ITEM_SELECT,

});

const loadPublications = item => (dispatch, getState) => {
    dispatch({item, type: LOAD_ITEM_PUBLICATIONS_REQUEST});
    fetch('http://localhost:8080/authors/'+item.id+'/pubs', {
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.json())
        .then(({ _embedded }) => {
            const publications = _embedded.pubs
                .map(p => ({ ...p, id: parseInt(p._links.self.href.replace('http://localhost:8080/pubs/','')) }));
            dispatch({
                publications,
                type: LOAD_ITEM_PUBLICATIONS_SUCCESS},
            );
        })
        .catch(() => dispatch({
            type: LOAD_ITEM_PUBLICATIONS_FAILURE,
            error: 'There was a problem loading the data',
        }));

}


export {
    fetchAuthorList,
    startEditing,
    changeEditingItem,
    cancelEditingItem,
    saveEditingItem,
    deleteEditingItem,
    loadPublications,
};

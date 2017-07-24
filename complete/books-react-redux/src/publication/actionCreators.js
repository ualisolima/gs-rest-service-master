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

const fetchPublicationList = () => (dispatch, getState) => {
    dispatch({ type: FETCH_LIST_REQUEST });
    var ppp = [];
    fetch('http://localhost:8080/pubs', {
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.json())
        .then(({ _embedded }) => {
            const pubs = _embedded.pubs
                .map(p => {
                    return ({ ...p, id: parseInt(p._links.self.href.replace('http://localhost:8080/pubs/','')), author : {}, publisher : {}});
                });

            dispatch({
                pubs,
                type: FETCH_LIST_SUCCESS,
            });
            ppp = pubs;
        })
        .catch(() => dispatch({
            type: FETCH_LIST_FAILURE,
            error: 'There was a problem loading the data',
        }));



    dispatch({ type: FETCH_PUBLISHER_LIST_REQUEST });
    fetch('http://localhost:8080/publishers', {
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.json())
        .then(({ _embedded }) => {
            const publishers = _embedded.publishers
                .map(p => ({ ...p, id: parseInt(p._links.self.href.replace('http://localhost:8080/publishers/','')) }));
            dispatch({
                publishers,
                type: FETCH_PUBLISHER_LIST_SUCCESS,
            });
        })
        .catch(() => dispatch({
            type: FETCH_PUBLISHER_LIST_FAILURE,
            error: 'There was a problem loading the data',
        }));
    dispatch({ type: FETCH_AUTHOR_LIST_REQUEST });

    fetch('http://localhost:8080/authors', {
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.json())
        .then(({ _embedded }) => {
            const authors = _embedded.authors
                .map(a => ({ ...a, id: parseInt(a._links.self.href.replace('http://localhost:8080/authors/','')),}));
            dispatch({
                authors,
                type: FETCH_AUTHOR_LIST_SUCCESS,
            });
        })
        .catch(() => dispatch({
            type: FETCH_AUTHOR_LIST_FAILURE,
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
    if (getState.isEditing && item.year !== '' && item.title !== '') {
        fetch('http://localhost:8080/pubs/' + item.id, {
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            method: "PUT",
            body: JSON.stringify(item),
        }).then(response => response.json())
            .then(() => {

                dispatch({
                    type: EDITING_ITEM_SAVE_SUCCESS,
                });
                dispatch(fetchPublicationList());
            })
            .catch(() => dispatch({
                type: EDITING_ITEM_SAVE_FAILURE,
                error: 'There was a problem saving the data',
            }));
    } else if (item.year !== '' && item.title !== '') {
        fetch('http://localhost:8080/pubs/', {
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify(item),
        }).then(response => response.json())
            .then(() => {

                dispatch({
                    type: EDITING_ITEM_SAVE_SUCCESS,
                });
                dispatch(fetchPublicationList());
            })
            .catch(() => dispatch({
                type: EDITING_ITEM_SAVE_FAILURE,
                error: 'There was a problem saving the data',
            }));
    }




};

const deleteEditingItem = item => (dispatch, getState) => {
    dispatch({type: EDITING_ITEM_DELETE_REQUEST});
    fetch('http://localhost:8080/pubs/'+item.id,{
        mode: 'cors',
        method: "DELETE",
    }).then(() => {

            dispatch({
                type: EDITING_ITEM_DELETE_SUCCESS,
            });
            dispatch(fetchPublicationList());
        })
        .catch(() => dispatch({
            type: EDITING_ITEM_DELETE_FAILURE,
            error: 'There was a problem deleting the data',
        }));
}

const beforeStartEditing1 = item => (dispatch, getState) => {
    dispatch({ type: BEFORE_START_EDITING1_REQUEST });

    fetch(item._links.author.href, {
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.json())
        .then(author  => {
            author.id = parseInt(author._links.self.href.replace('http://localhost:8080/authors/',''));
            item.author = author;
            dispatch({
                item,
                type: BEFORE_START_EDITING1_SUCCESS,
            });
        }).then(() => {
        dispatch(
            beforeStartEditing2(item)
        )
    }).then(()=>{
        dispatch(
            startEditing(item)
        )
    })
        .catch(() => dispatch({
            type: BEFORE_START_EDITING1_FAILURE,
            error: 'There was a problem loading the data',
        }));
}

const beforeStartEditing2 = item => (dispatch, getState) => {
    dispatch({ type: BEFORE_START_EDITING2_REQUEST });

    fetch(item._links.publisher.href, {
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.json())
        .then(publisher  => {
            publisher.id = parseInt(publisher._links.self.href.replace('http://localhost:8080/publishers/',''));
            item.publisher = publisher;
            dispatch({
                item,
                type: BEFORE_START_EDITING2_SUCCESS,
            });
        })
        .catch(() => dispatch({
            type: BEFORE_START_EDITING2_FAILURE,
            error: 'There was a problem loading the data',
        }));
}

const startEditing = item => (dispatch, getState) => {
    dispatch({item,
    type: CURRENT_ITEM_SELECT,});


};

export {
    fetchPublicationList,
    startEditing,
    changeEditingItem,
    cancelEditingItem,
    saveEditingItem,
    deleteEditingItem,
    beforeStartEditing1,
    beforeStartEditing2,
};

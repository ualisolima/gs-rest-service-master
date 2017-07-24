import { connect } from 'react-redux';

import PublicationPage from '../components/PublicationPage';
import {beforeStartEditing1, beforeStartEditing2, startEditing, changeEditingItem,cancelEditingItem,saveEditingItem, deleteEditingItem} from '../actionCreators';

const mapStateToProps = ({
                            publications,
                            authors,
                             publishers,
                             isFetching,
                             message,
                             editingItem,
                             isSaving,
                            isEditing,
                         }) => ({
    publications,
    authors,
    publishers,
    message,
    editingItem,
    isEditing,
    loading: isFetching || isSaving,
});

const mapDispatchToProps = dispatch => ({
    onBeforeEditItem1 : item => {dispatch(beforeStartEditing1(item));},
    onBeforeEditItem2 : item => {dispatch(beforeStartEditing1(item));},
    onEditItemClick: item =>{
        dispatch(beforeStartEditing1(item));
    },
    onEditingItemChange : item => {dispatch(changeEditingItem(item));},
    onCancelEditing : () => {dispatch(cancelEditingItem());},
    onSaveEditing : item => {dispatch(saveEditingItem(item));},
    onDeleteItemClick : item => {dispatch(deleteEditingItem(item));},
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicationPage);

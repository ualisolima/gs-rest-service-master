import { connect } from 'react-redux';

import AuthorPage from '../components/AuthorPage';
import { loadPublications, startEditing, changeEditingItem,cancelEditingItem,saveEditingItem, deleteEditingItem} from '../actionCreators';

const mapStateToProps = ({
                             authors,
                             isFetching,
                             message,
                             currentItem,
                             editingItem,
                             isSaving,
                            isEditing,
                             publications,
                            selectedItem,
                         }) => ({
    message,
    authors,
    editingItem,
    isEditing,
    publications,
    selectedItem,
    selectedId: currentItem.url,
    loading: isFetching || isSaving,
});

const mapDispatchToProps = dispatch => ({
    onEditItemClick: item =>{ dispatch(startEditing(item));},
    onEditingItemChange : item => {dispatch(changeEditingItem(item));},
    onCancelEditing : () => {dispatch(cancelEditingItem());},
    onSaveEditing : item => {dispatch(saveEditingItem(item));},
    onDeleteItemClick : item => {dispatch(deleteEditingItem(item));},
    onLoadPublications : item => {dispatch(loadPublications(item))},
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPage);

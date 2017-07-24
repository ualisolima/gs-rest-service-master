import { connect } from 'react-redux';

import PublisherPage from '../components/PublisherPage';
import { loadPublications,startEditing, changeEditingItem,cancelEditingItem,saveEditingItem, deleteEditingItem} from '../actionCreators';

const mapStateToProps = ({
                             publishers,
                             isFetching,
                             message,
                             currentItem,
                             editingItem,
                             isSaving,
                            isEditing,
                            selectedItem,
                            publications,
                         }) => ({
    message,
    publishers,
    publications,
    editingItem,
    isEditing,
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
    onLoadPublications : item => {dispatch(loadPublications(item));},
});

export default connect(mapStateToProps, mapDispatchToProps)(PublisherPage);

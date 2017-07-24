/**
 * Created by wallinsondeivesbatistalima on 22/07/17.
 */
import React from 'react'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import ActionSave from 'material-ui/svg-icons/device/sd-storage'
import ActionCancel from 'material-ui/svg-icons/content/block'
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const publisherShape = PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    location: PropTypes.string,
});

const authorShape = PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
});

const publicationShape = PropTypes.shape({
    id: PropTypes.number,
    year: PropTypes.string,
    title: PropTypes.string,
    author : authorShape,
    publisher : publisherShape,
    type : PropTypes.string,
});

const propTypes = {
    publications: PropTypes.arrayOf(publicationShape),
    authors : PropTypes.arrayOf(authorShape),
    publishers: PropTypes.arrayOf(publisherShape),
    selectedId: PropTypes.string,
    editingItem: publicationShape,
    loading: PropTypes.bool,
    isEditing: PropTypes.bool,
    message: PropTypes.string,
    onEditingItemChange: PropTypes.func,
    onSaveEditing: PropTypes.func,
    onCancelEditing: PropTypes.func,
    onEditItemClick: PropTypes.func,
    onBeforeEditItem1: PropTypes.func,
    onBeforeEditItem2: PropTypes.func,
    onDeleteItemClick: PropTypes.func,
};

const defaultProps = {
    authors : [],
    publications : [],
    publishers: [],
    selectedId: null,
    editingItem: {
        year : '',
        title : '',
        author : {},
        publisher : {},
        type : 'BOOK',
    },
    loading: false,
    isEditing : false,
    message: '',
    onEditingItemChange: Function.prototype,
    onSaveEditing: Function.prototype,
    onCancelEditing: Function.prototype,
    onEditItemClick: Function.prototype,
    onBeforeEditItem1 : Function.prototype,
    onBeforeEditItem2 : Function.prototype,
    onDeleteItemClick: Function.prototype,
};


function PublisherPage(props) {
    const handleEditingFirstNameField = (component, value) => {
        const item = {
            id : props.editingItem.id,
            year : value,
            title : props.editingItem.title,
            author : props.editingItem.author,
            publisher: props.editingItem.publisher,
            type : props.editingItem.type,
        };
        //alert(JSON.stringify(item));
        props.onEditingItemChange(item);
    };

    const handleEditingLastNameField = (component, value) => {
        const item = {
            id : props.editingItem.id,
            year : props.editingItem.year,
            title : value,
            author : props.editingItem.author,
            publisher: props.editingItem.publisher,
            type : props.editingItem.type,
        };
        //alert(JSON.stringify(item));
        props.onEditingItemChange(item);
    };

    const handleChangeAuthor = (event, index, value) => {
        const item = {
            id : props.editingItem.id,
            year : props.editingItem.year,
            title : props.editingItem.title,
            author : { id: value},
            publisher: props.editingItem.publisher,
            type : props.editingItem.type,
        };
        props.onEditingItemChange(item);
        //alert(JSON.stringify(item));
    };
    const handleChangeType = (event, index, value) => {
        const item = {
            id : props.editingItem.id,
            year : props.editingItem.year,
            title : props.editingItem.title,
            author : props.editingItem.author,
            publisher: props.editingItem.publisher,
            type : value,
        };
        props.onEditingItemChange(item);
        //alert(JSON.stringify(item));
    };
    const handleChangePublisher = (event, index, value) => {
        const item = {
            id : props.editingItem.id,
            year : props.editingItem.year,
            title : props.editingItem.title,
            author : props.editingItem.author,
            publisher: { id: value },
            type : props.editingItem.type,
        };
        props.onEditingItemChange(item);
        //alert(JSON.stringify(item));
    };

    return (

        <MuiThemeProvider>
            <div>
                <Card>
                    <CardTitle title="Publications" subtitle="Create or update an existing publication" />
                    <CardText>
                        <TextField
                            value={props.editingItem.year}
                            floatingLabelText="Year"
                            fullWidth="true"
                            onChange={handleEditingFirstNameField}
                            errorText="This field is required"
                        />
                        <br />
                        <TextField
                            value={props.editingItem.title}
                            floatingLabelText="Title"
                            fullWidth="true"
                            onChange={handleEditingLastNameField}
                            errorText="This field is required"
                        />
                        <br />
                        Author : <DropDownMenu value={props.editingItem.author !== undefined? props.editingItem.author.id : undefined} onChange={handleChangeAuthor}>
                            {props.authors.map(item => (
                                <MenuItem value={item.id} primaryText={item.firstName + ' ' + item.lastName} />
                            ))}
                        </DropDownMenu>
                        <br />
                        Publisher : <DropDownMenu value={props.editingItem.publisher !== undefined? props.editingItem.publisher.id : undefined} onChange={handleChangePublisher}>
                            {props.publishers.map(item => (
                                <MenuItem value={item.id} primaryText={item.name + ' ' + item.location} />
                            ))}
                        </DropDownMenu>
                        <br />
                        Type : <DropDownMenu value={props.editingItem.type} onChange={handleChangeType}>
                            <MenuItem value={'BOOK'} primaryText={'BOOK'} />
                            <MenuItem value={'MAGAZINE'} primaryText={'MAGAZINE'} />
                            <MenuItem value={'JOURNAL'} primaryText={'JOURNAL'} />
                        </DropDownMenu>

                    </CardText>
                    <CardActions>
                        <FlatButton icon={<ActionSave />} onTouchTap={() => props.onSaveEditing(props.editingItem)} label="Save" />
                        <FlatButton icon={<ActionCancel/>} onTouchTap={props.onCancelEditing} label="Cancel" />
                    </CardActions>
                </Card>
                <Card>
                    <CardTitle title="List of Publications"  />
                    <CardText>
                        <Table>
                            <TableHeader displaySelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Year</TableHeaderColumn>
                                    <TableHeaderColumn>Title</TableHeaderColumn>
                                    <TableHeaderColumn>Edit</TableHeaderColumn>
                                    <TableHeaderColumn>Delete</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                {props.publications.map(item => (
                                    <TableRow>
                                        <TableRowColumn>{item.id}</TableRowColumn>
                                        <TableRowColumn>{item.year}</TableRowColumn>
                                        <TableRowColumn>{item.title}</TableRowColumn>
                                        <TableRowColumn><FlatButton onTouchTap={() =>{
                                            props.onBeforeEditItem1(item);
                                            props.onBeforeEditItem2(item);
                                            props.onEditItemClick(item);
                                        }
                                        } label="Edit" /></TableRowColumn>
                                        <TableRowColumn><FlatButton onTouchTap={() => props.onDeleteItemClick(item)} label="Delete" /></TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardText>
                </Card>
                <Snackbar
                    open={props.message != ''}
                    message={props.message}
                    autoHideDuration={4000}
                />
            </div>
        </MuiThemeProvider>
    )


}

PublisherPage.propTypes = propTypes;
PublisherPage.defaultProps = defaultProps;

export default PublisherPage;
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

const publicationShape = PropTypes.shape({
    id: PropTypes.number,
    year: PropTypes.string,
    title: PropTypes.string,
});

const propTypes = {
    publishers: PropTypes.arrayOf(publisherShape),
    publications : PropTypes.arrayOf(publicationShape),
    selectedId: PropTypes.string,
    editingItem: publisherShape,
    selectedItem : publisherShape,
    loading: PropTypes.bool,
    isEditing: PropTypes.bool,
    message: PropTypes.string,
    onEditingItemChange: PropTypes.func,
    onSaveEditing: PropTypes.func,
    onCancelEditing: PropTypes.func,
    onEditItemClick: PropTypes.func,
    onDeleteItemClick: PropTypes.func,
    onLoadPublications : PropTypes.func,
};

const defaultProps = {
    publishers: [],
    publications : [],
    selectedId: null,
    editingItem: {
        name: '',
        location: '',
    },
    selectedItem: {
        name: 'Select an Item',
        location: '',
    },
    loading: false,
    isEditing : false,
    message: '',
    onEditingItemChange: Function.prototype,
    onSaveEditing: Function.prototype,
    onCancelEditing: Function.prototype,
    onEditItemClick: Function.prototype,
    onDeleteItemClick: Function.prototype,
    onLoadPublications:Function.prototype,

};


function PublisherPage(props) {
    const handleEditingFirstNameField = (component, value) => {
        const item = {
            id : props.editingItem.id,
            name : value,
            location : props.editingItem.location,
        };
        props.onEditingItemChange(item);
    };

    const handleEditingLastNameField = (component, value) => {
        const item = {
            id : props.editingItem.id,
            name : props.editingItem.name,
            location : value,
        };
        props.onEditingItemChange(item);
    };

    return (

        <MuiThemeProvider>
            <div>
                <Card>
                    <CardTitle title="Publishers" subtitle="Create or update an existing publisher" />
                    <CardText>
                        <TextField
                            value={props.editingItem.name}
                            floatingLabelText="Name"
                            fullWidth="true"
                            onChange={handleEditingFirstNameField}
                            errorText="This field is required"
                        />
                        <br />
                        <TextField
                            value={props.editingItem.location}
                            floatingLabelText="Location"
                            fullWidth="true"
                            onChange={handleEditingLastNameField}
                            errorText="This field is required"
                        />
                        <br />
                    </CardText>
                    <CardActions>
                        <FlatButton icon={<ActionSave />} onTouchTap={() => props.onSaveEditing(props.editingItem)} label="Save" />
                        <FlatButton icon={<ActionCancel/>} onTouchTap={props.onCancelEditing} label="Cancel" />
                    </CardActions>
                </Card>
                <Card>
                    <CardTitle title="List of Publishers"  />
                    <CardText>
                        <Table>
                            <TableHeader displaySelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                    <TableHeaderColumn>Location</TableHeaderColumn>
                                    <TableHeaderColumn>Edit</TableHeaderColumn>
                                    <TableHeaderColumn>Delete</TableHeaderColumn>
                                    <TableHeaderColumn>Publications</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                {props.publishers.map(item => (
                                    <TableRow>
                                        <TableRowColumn>{item.id}</TableRowColumn>
                                        <TableRowColumn>{item.name}</TableRowColumn>
                                        <TableRowColumn>{item.location}</TableRowColumn>
                                        <TableRowColumn><FlatButton onTouchTap={() => props.onEditItemClick(item)} label="Edit" /></TableRowColumn>
                                        <TableRowColumn><FlatButton onTouchTap={() => props.onDeleteItemClick(item)} label="Delete" /></TableRowColumn>
                                        <TableRowColumn><FlatButton onTouchTap={() => props.onLoadPublications(item)} label="Publications" /></TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardText>
                </Card>
                <Card>
                    <CardTitle title={'List of Publications - ' + props.selectedItem.name + ' ' +props.selectedItem.location }  />
                    <CardText>
                        <Table>
                            <TableHeader displaySelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Year</TableHeaderColumn>
                                    <TableHeaderColumn>Title</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                {props.publications.map(item => (
                                    <TableRow>
                                        <TableRowColumn>{item.id}</TableRowColumn>
                                        <TableRowColumn>{item.year}</TableRowColumn>
                                        <TableRowColumn>{item.title}</TableRowColumn>
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
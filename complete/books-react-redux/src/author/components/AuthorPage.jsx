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

const authorShape = PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
});

const publicationShape = PropTypes.shape({
    id: PropTypes.number,
    year: PropTypes.string,
    title: PropTypes.string,
});


const propTypes = {
    authors: PropTypes.arrayOf(authorShape),
    publications : PropTypes.arrayOf(publicationShape),
    selectedId: PropTypes.string,
    editingItem: authorShape,
    selectedItem : authorShape,
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
    authors: [],
    publications : [],
    selectedId: null,
    editingItem: {
        firstName: '',
        lastName: '',
    },
    selectedItem: {
        firstName: 'Select an Item',
        lastName: '',
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


function AuthorPage(props) {
    const handleEditingFirstNameField = (component, value) => {
        const item = {
            id : props.editingItem.id,
            firstName : value,
            lastName : props.editingItem.lastName,
        };
        props.onEditingItemChange(item);
    };

    const handleEditingLastNameField = (component, value) => {
        const item = {
            id : props.editingItem.id,
            firstName : props.editingItem.firstName,
            lastName : value,
        };
        props.onEditingItemChange(item);
    };

    return (

        <MuiThemeProvider>
            <div>
                <Card>
                    <CardTitle title="Authors" subtitle="Create or update an existing author" />
                    <CardText>
                        <TextField
                            value={props.editingItem.firstName}
                            floatingLabelText="First Name"
                            fullWidth="true"
                            onChange={handleEditingFirstNameField}
                            errorText="This field is required"
                        />
                        <br />
                        <TextField
                            value={props.editingItem.lastName}
                            floatingLabelText="Last Name"
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
                    <CardTitle title="List of Authors"  />
                    <CardText>
                        <Table>
                            <TableHeader displaySelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>First Name</TableHeaderColumn>
                                    <TableHeaderColumn>Last Name</TableHeaderColumn>
                                    <TableHeaderColumn>Edit</TableHeaderColumn>
                                    <TableHeaderColumn>Delete</TableHeaderColumn>
                                    <TableHeaderColumn>Publications</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                {props.authors.map(item => (
                                    <TableRow>
                                        <TableRowColumn>{item.id}</TableRowColumn>
                                        <TableRowColumn>{item.firstName}</TableRowColumn>
                                        <TableRowColumn>{item.lastName}</TableRowColumn>
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
                    <CardTitle title={'List of Publications - ' + props.selectedItem.firstName + ' ' +props.selectedItem.lastName }  />
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

AuthorPage.propTypes = propTypes;
AuthorPage.defaultProps = defaultProps;

export default AuthorPage;
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import authorReducer from './author/reducer';
import publisherReducer from './publisher/reducer';
import publicationReducer from './publication/reducer';
import { fetchAuthorList } from './author/actionCreators';
import AuthorPageContainer from './author/containers/AuthorPage';
import { fetchPublisherList } from './publisher/actionCreators';
import PublisherPageContainer from './publisher/containers/PublisherPage';
import PublicationPageContainer from './publication/containers/PublicationPage';
import { fetchPublicationList } from './publication/actionCreators';
const storeAuthor = createStore(
    authorReducer,
    undefined,
    applyMiddleware(thunkMiddleware, logger),
);

const storePublisher = createStore(
    publisherReducer,
    undefined,
    applyMiddleware(thunkMiddleware, logger),
);

const storePublication = createStore(
    publicationReducer,
    undefined,
    applyMiddleware(thunkMiddleware, logger),
);



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
        this.handleAuthors = this.handleAuthors.bind(this);
        this.handlePublishers = this.handlePublishers.bind(this);
        this.handlePublications = this.handlePublications.bind(this);
    }

    componentDidMount() {
        const initialActionAuthors = fetchAuthorList();
        const initialActionPublishers = fetchPublisherList();
        const initialActionPublications = fetchPublicationList();
        storeAuthor.dispatch(initialActionAuthors);
        storePublisher.dispatch(initialActionPublishers);
        storePublication.dispatch(initialActionPublications);
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    handlePublications() {
        this.setState({open : false});
        ReactDOM.unmountComponentAtNode(document.getElementById('content'));
        ReactDOM.render(<Provider store={storePublication}><PublicationPageContainer /></Provider>, document.getElementById('content'));
    };

    handleAuthors() {
        this.setState({open : false});
        ReactDOM.unmountComponentAtNode(document.getElementById('content'));
        ReactDOM.render(<Provider store={storeAuthor}><AuthorPageContainer /></Provider>, document.getElementById('content'));
    }

    handlePublishers() {
        this.setState({open : false});
        ReactDOM.unmountComponentAtNode(document.getElementById('content'));
        ReactDOM.render(<Provider store={storePublisher}><PublisherPageContainer /></Provider>, document.getElementById('content'));
    }



    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Drawer
                        docked={false}
                        width={200}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}
                    >
                        <MenuItem onTouchTap={this.handleAuthors}>Authors</MenuItem>
                        <MenuItem onTouchTap={this.handlePublications}>Publications</MenuItem>
                        <MenuItem onTouchTap={this.handlePublishers}>Publishers</MenuItem>
                    </Drawer>
                    <AppBar title="iFactory Training"
                            onLeftIconButtonTouchTap={this.handleToggle}
                            iconElementRight ={ <IconButton tooltip="Home Page">
                                <ActionHome onTouchTap={() => {
                                    ReactDOM.unmountComponentAtNode(document.getElementById('content'));
                                }
                                } />
                            </IconButton>}
                    />

                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
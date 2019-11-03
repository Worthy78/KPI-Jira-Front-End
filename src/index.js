import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App/index';
import * as serviceWorker from './serviceWorker';
import config from './constants/config';
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import rootReducer from './store/reducers/rootReducer'

const store = createStore(rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

// Alert Options
const alertOptions = {
    position: "top center"
};

const app = (
    <Provider store={store}>
        <BrowserRouter basename={config.basename}>
            <AlertProvider template={AlertTemplate} {...alertOptions}>
                {/* basename="/datta-able" */}
                <App />
            </AlertProvider>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import client from 'services/apollo-client';
import { ApolloProvider } from '@apollo/client';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    <React.StrictMode>
        <Router>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </Router>
    </React.StrictMode>,
);

reportWebVitals();

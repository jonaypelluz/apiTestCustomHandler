import React from 'react';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApiProvider } from './store/ApiContext';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Router>
            <ApiProvider>
                <App />
            </ApiProvider>
        </Router>
    </React.StrictMode>,
);

reportWebVitals();

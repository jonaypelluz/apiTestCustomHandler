import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Router = ({ importedModules }) => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {(!isEmpty(importedModules) &&
                importedModules.map(({ path, Component }) => (
                    <Route
                        key={path}
                        exact
                        path={`/${path}`}
                        element={
                            <Suspense fallback="loading...">
                                <Component />
                            </Suspense>
                        }
                    />
                ))) ||
                null}
            <Route path="*" exact={true} element={<NotFound />} />
        </Routes>
    );
};

Router.propTypes = {
    importedModules: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string.isRequired,
            Component: PropTypes.elementType.isRequired,
        }),
    ),
};

export default Router;

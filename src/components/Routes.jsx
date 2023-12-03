import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { lazy, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Logger from 'services/Logger';

const transformSection = (string, singular = false) => {
    const firstLetter = string.charAt(0);

    if (singular && string.endsWith('s')) {
        return firstLetter + string.slice(0, -1).slice(1);
    } else {
        return firstLetter + string.slice(1);
    }
};

const getActiveModules = (sections) => {
    const modules = sections.flatMap((section) => {
        const basePath = `/${section}`;
        return [
            {
                path: basePath,
                exact: true,
                Component: lazy(() => import(`pages/Items`)),
            },
            {
                path: `${basePath}/page/:page`,
                Component: lazy(() => import(`pages/Items`)),
            },
            {
                path: `${transformSection(basePath, true)}/:id}`,
                Component: lazy(() => import(`pages/Item`)),
            },
        ];
    });

    return modules;
};

const Router = () => {
    const { sections, appName } = useSelector((state) => state.apiConfig);
    const [importedModules, setImportedModules] = useState([]);

    useEffect(() => {
        const importPlugins = async () => {
            try {
                const modules = getActiveModules(sections);
                Logger.log('Imported sections', modules);
                setImportedModules(modules);
            } catch (err) {
                Logger.error(err.toString());
            }
        };
        importPlugins();
    }, [appName]);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {(importedModules &&
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

export default Router;

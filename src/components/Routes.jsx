import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { lazy, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Logger from 'services/Logger';
import stringToSingular from 'helpers/stringToSingular';

const Items = lazy(() => import(`pages/Items`));
const Item = lazy(() => import(`pages/Item`));

const getActiveModules = (sections) => {
    const modules = sections.flatMap((section) => {
        const basePath = `/${section}`;
        return [
            {
                path: basePath,
                exact: true,
                Component: Items,
            },
            {
                path: `${basePath}/page/:page`,
                Component: Items,
            },
            {
                path: `${stringToSingular(basePath)}/:id`,
                Component: Item,
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
                        path={path}
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

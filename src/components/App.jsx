import './styles.scss';
import { lazy, useState, useEffect, useRef } from 'react';
import Routes from './Routes';
import Header from 'components/Header';
import { useApiContext } from 'store/ApiContext';
import logger from 'services/Logger';

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

const App = () => {
    const [importedModules, setImportedModules] = useState([]);
    const isInitialRender = useRef(true);
    const apiContext = useApiContext();

    useEffect(() => {
        const importPlugins = async () => {
            try {
                const apiConfig = apiContext.config;
                const modules = getActiveModules(apiConfig.sections);
                logger.log('Imported sections', modules);
                setImportedModules(modules);
            } catch (err) {
                console.error(err.toString());
            }
        };

        if (isInitialRender.current) {
            isInitialRender.current = false;
        } else {
            importPlugins();
        }
    }, [apiContext.config]);

    return (
        <>
            <Header />
            <Routes importedModules={importedModules} />
        </>
    );
};

export default App;

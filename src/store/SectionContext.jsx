import { createContext, useContext, useState, useEffect } from 'react';
import StorageService from 'store/StorageService';
import PropTypes from 'prop-types';

const SectionContext = createContext();

const SectionContextProviderImpl = ({ children }) => {
    const [selectedSection, setSelectedSection] = useState('');

    useEffect(() => {
        const storedSelectedSection = StorageService.getItem(StorageService.SECTION_SELECTED);

        setSelectedSection(storedSelectedSection !== null ? storedSelectedSection : '');
    }, []);

    const value = {
        selectedSection,
        setSelectedSection,
    };

    return <SectionContext.Provider value={value}>{children}</SectionContext.Provider>;
};

export const SectionContextProvider = ({ children }) => {
    return <SectionContextProviderImpl>{children}</SectionContextProviderImpl>;
};

export const useSectionContext = () => {
    const context = useContext(SectionContext);
    if (!context) {
        throw new Error('useSectionContext must be used within an SectionContextProvider');
    }
    return context;
};

SectionContextProviderImpl.propTypes = {
    children: PropTypes.node.isRequired,
};

SectionContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

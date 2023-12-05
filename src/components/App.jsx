import './styles.scss';
import Routes from './Routes';
import Header from 'components/Header';
import { SectionContextProvider } from 'store/SectionContext';

const App = () => (
    <SectionContextProvider>
        <Header />
        <Routes />
    </SectionContextProvider>
);

export default App;

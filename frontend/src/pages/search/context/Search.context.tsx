import { createContext, useState, useContext } from 'react';
import { ISearchContextInterface } from '../intertaces/ISearchContext.interface';

const SearchContext = createContext<ISearchContextInterface>(
    { 
        searchTerm: '',
        setSearchTerm: () => {}
    }
);

export const SearchProvider: React.FC<{ children: any }>  = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
            { children }
        </SearchContext.Provider>
    );
}

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (context === undefined)
        throw new Error('useSearchContext must be used within a SearchProvider');
    return context;
}
import { createContext, useState, useContext } from 'react';
import { ISearchContextInterface } from '../intertaces/ISearchContext.interface';
import ISongsSuggestion from '../../../types/ISongsSuggestion';

const SearchContext = createContext<ISearchContextInterface | undefined>(undefined);

export const SearchProvider: React.FC<{ children: any }>  = ({ children }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [totalResults, setTotalResults] = useState<number | null>(null);
    const [allResults, setAllResults] = useState<ISongsSuggestion[]>([]);
    const [notResults, setNotResults] = useState(false);

    return (
        <SearchContext.Provider value={{
            searchTerm, setSearchTerm,
            loading, setLoading,
            totalResults, setTotalResults,
            allResults, setAllResults,
            notResults, setNotResults
        }} >
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
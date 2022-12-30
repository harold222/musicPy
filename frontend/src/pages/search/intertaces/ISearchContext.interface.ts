import React from 'react';
import ISongsSuggestion from '../../../types/ISongsSuggestion';

export interface ISearchContextInterface {
    searchTerm: string,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    totalResults: number | null,
    setTotalResults: React.Dispatch<React.SetStateAction<number | null>>,
    allResults: ISongsSuggestion[],
    setAllResults: React.Dispatch<React.SetStateAction<ISongsSuggestion[]>>,
    notResults: boolean,
    setNotResults: React.Dispatch<React.SetStateAction<boolean>>,
}
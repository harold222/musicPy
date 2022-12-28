import React from 'react';

export interface ISearchContextInterface {
    searchTerm: string,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}
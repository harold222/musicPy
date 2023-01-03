import musicService from "../../services/music.service";
import { useSearchContext } from '../../pages/search/context/Search.context';
import { useState } from 'react';
import ISongsSuggestion from '../../types/ISongsSuggestion';

export const useSearchMusic = () => {

    const { searchTerm, setLoading, setTotalResults } = useSearchContext();
    const [resp, setResp] = useState<ISongsSuggestion[] | null>(null);

    setLoading(true);

    musicService.searchMusic(searchTerm)
        .then(resp => {
            const { results, total } = resp.data;
            setResp(results);
            setTotalResults(total);
            setLoading(false);
        })
        .catch((e: Error) => {
            setLoading(false)
            console.log('error: ', e);
        });

    return resp;
}
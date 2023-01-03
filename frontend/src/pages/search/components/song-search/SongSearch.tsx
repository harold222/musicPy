import MusicService from '../../../../services/music.service';
import { useSearchContext } from '../../context/Search.context';
import './SongSearch.scss';
import { useState, useEffect, MouseEvent, useRef } from 'react';
import { ListSong } from '../list-song/ListSong';
import { NotResults } from '../not-results/NotResults';
import { useSearchMusic } from '../../../../components/customHooks/useSearchMusic';

export const SongSearch = () => {

    const {
        searchTerm, setSearchTerm,
        setLoading,
        setTotalResults,
        setAllResults,
        setNotResults
    } = useSearchContext();

    const [results, setResults] = useState<string[]>([]);
    const inputSearch = useRef<HTMLInputElement>(null);
    const button = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const searchService = async (term: string) => {
            setLoading(true);

            MusicService.searchSuggestion(term)
                .then(resp => {
                    resp.data && setResults(resp.data.suggestions);
                    setLoading(false)
                    setNotResults(false)
                })
                .catch((e: Error) => {
                    setLoading(false)
                    setNotResults(true)
                    console.log('error: ', e);
                })
        }

        const delayFn = setTimeout(() => {
            if (button?.current) button.current.disabled = false;
            
            if (!inputSearch.current?.disabled) {
                const term = searchTerm.trim();
                if (term && term?.length > 2) {
                    setNotResults(false);
                    searchService(searchTerm.trim());
                } else
                    setResults([]);
            }
        }, 450);

        return () => clearTimeout(delayFn);
    }, [searchTerm]);

    useEffect(() => {
        if (!results && searchTerm)
            setNotResults(true)
    }, [results]);

    const clickResultItem = (option: string) => {
        if (inputSearch?.current) {
            inputSearch.current.disabled = true;
            setResults([]);
            setSearchTerm(option);
        }
    }

    const searchSong = async (e: MouseEvent<HTMLButtonElement>) => {
        if (searchTerm) {
            const button = e?.currentTarget;
    
            if (button) {
                button.disabled = true;
                const resp = useSearchMusic();
                resp && setAllResults(resp);
            }
        }
    };

    return(
        <>
            <div className="search-container">
                <div className="search-content">
                    <input type="text" autoComplete='off'
                        className="search-input form-control" placeholder='Enter your song...'
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        ref={inputSearch}
                    />

                    {
                        results && 
                            <div className="search-results">
                                {
                                    results.map((option, index) => (
                                        <li key={index} className="search-results-item"
                                            onClick={() => {
                                                clickResultItem(option)
                                            }}>
                                            {option}
                                        </li>
                                    ))
                                }
                            </div>
                    }
                </div>
                <button type="button" className="btn btn-outline-success"
                    onClick={searchSong} ref={button}>
                    Search
                </button>
            </div>

            <NotResults/>
            <ListSong/>
        </>
    );
}
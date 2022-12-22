import { useEffect, useState, MouseEvent } from "react";
import { Loading } from "../shared/Loading"
import MusicService from '../../services/music.service'
import ISongsSuggestion from "../../types/ISongsSuggestion";
import './Search.scss';
import { ListSong } from '../list-song/ListSong';

export const Search = () => {

    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<string[]>([]);
    const [notResults, setNotResults] = useState(false);
    const [allResults, setAllResults] = useState<ISongsSuggestion[]>([]);
    const [totalResults, setTotalResults] = useState<number | null>(null);

    const clickResultItem = (option: string) => {
        const inputSearch = document.querySelector('#searchInput') as HTMLInputElement | null;
        if (inputSearch) inputSearch.disabled = true;
        setResults([]);
        setSearchTerm(option);
    }

    const searchSong = async (e: MouseEvent<HTMLButtonElement>) => {
        if (searchTerm) {
            const button = e?.currentTarget;
    
            if (button) {
                button.disabled = true;
                setLoading(true);
                MusicService.searchMusic(searchTerm)
                    .then(resp => {
                        const { results, total } = resp.data;
                        setAllResults(results);
                        setTotalResults(total);
                        setLoading(false);
                    })
                    .catch((e: Error) => {
                        setLoading(false)
                        console.log('error: ', e);
                    });
            }
        }
    }

    useEffect(() => {
        const searchService = async (term: string) => {
            setLoading(true)
            MusicService.searchSuggestion(term)
            .then(resp => {
                resp.data && setResults(resp.data.suggestions);
                setLoading(false)
            })
            .catch((e: Error) => {
                setLoading(false)
                console.log('error: ', e);
            })
        }

        const delayFn = setTimeout(() => {
            const button = document.querySelector('#searchSong') as HTMLButtonElement | null;
            if (button) button.disabled = false;
            
            const inputSearch = document.querySelector('#searchInput') as HTMLInputElement | null;

            if (!inputSearch?.disabled) {
                const term = searchTerm.trim();
                if (term && term?.length > 2) {
                    setNotResults(false);
                    searchService(searchTerm.trim());
                } else
                    setResults([]);
            }
        }, 450);

        return () => clearTimeout(delayFn);
    }, [searchTerm])

    useEffect(() => {
        if (!results && searchTerm)
            setNotResults(true)
    }, [results])

    return(
        <div className="container mt-3">
            <div className="row">
                <div className="col">
                    <h4 className="text-center">
                        Search music
                    </h4>
                    <hr />

                    <div className="search-container">
                        <div className="search-content">
                            <input type="text" autoComplete='off'
                                className="search-input form-control" placeholder='Enter your song...'
                                onChange={(e) => setSearchTerm(e.target.value)}
                                value={searchTerm}
                                id="searchInput"
                            />
                            {
                                results && 
                                    <div className="search-results">
                                        {
                                            results.map((option, index) => (
                                                <li key={index} className="search-results-item"
                                                    onClick={() => clickResultItem(option)}>
                                                    {option}
                                                </li>
                                            ))
                                        }
                                    </div>
                            }
                        </div>
                        <button type="button" className="btn btn-outline-success"
                            onClick={searchSong} id="searchSong">
                            Search
                        </button>
                    </div>

                    {
                        notResults &&
                        <span className="badge rounded-pill text-bg-danger">
                            No results found
                        </span>
                    }

                    {
                        (allResults?.length > 0) &&
                        <div>
                            <ListSong songs={allResults}/>
                        </div>
                    }

                    {loading && <Loading/>}
                </div>
            </div>
        </div>
    )
}
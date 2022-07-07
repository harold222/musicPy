import { useEffect, useState, MouseEvent } from "react";
import { Loading } from "../shared/Loading"
import MusicService from '../../services/music.service'
import './Search.scss'
import ISongsSuggestion from '../../types/ISongsSuggestion';

export const Search = () => {

    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<string[]>([]);
    const [notResults, setNotResults] = useState(false);

    const clickResultItem = (option: string) => setSearchTerm(option)

    const searchSong = (e: MouseEvent<HTMLButtonElement>) => {
        const button = e?.currentTarget;
        
        if (button) {
            button.disabled = true;
            setResults([]);
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
                alert("An error has occurred, please reload the page.")
            })
        }

        const delayFn = setTimeout(() => {
            const term = searchTerm.trim()
            if (term && term?.length > 2) {
                setNotResults(false)
                searchService(searchTerm.trim())
            } else {
                setResults([])
            }
        }, 350)

        return () => clearTimeout(delayFn)
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
                            onClick={searchSong}>
                            Buscar
                        </button>
                    </div>

                    {
                        notResults &&
                        <span className="badge rounded-pill text-bg-danger">
                            No se encontraron resultados
                        </span>
                    }

                    {loading && <Loading/>}
                </div>
            </div>
        </div>
    )
}
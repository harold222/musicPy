import { useEffect, useState } from "react";
import { Loading } from "../shared/Loading"
import MusicService from '../../services/music.service'
import './Search.scss'
import ISongsSuggestion from '../../types/ISongsSuggestion';

export const Search = () => {

    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<ISongsSuggestion[]>([]);
    const [notResults, setNotResults] = useState(false);

    const changeTerm = (newTerm: string) => {
        // const regex = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
        // console.log('newTerm 1: ', newTerm);
        // newTerm = newTerm.replace(regex, "")
        // console.log('newTerm 2: ', newTerm);
        // if (newTerm.trim()) {
        //     setSearchTerm(newTerm)
        // }
        setSearchTerm(newTerm)
    }

    useEffect(() => {
        const searchService = async (term: string) => {
            setLoading(true)
            MusicService.search(term)
            .then(resp => {
                resp.data && setResults(resp.data.results);
                setLoading(false)
            })
            .catch((e: Error) => {
                setLoading(false)
                console.log('error: ', e);
                alert("An error has occurred, please reload the page.")
            })
        }

        const delayFn = setTimeout(() => {
            if (searchTerm?.trim()) {
                setNotResults(false)
                searchService(searchTerm.trim())
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
                    filtrar caracteres especiales
                    <input type="text" autoComplete='off'
                        className="search-input" placeholder='Enter your song...'
                        onChange={(e) => changeTerm(e.target.value)}
                        value={searchTerm}
                    />

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
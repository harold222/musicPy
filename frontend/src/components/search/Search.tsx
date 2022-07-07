import { useEffect, useState } from "react";
import { Loading } from "../shared/Loading"
import axios from 'axios';
import './Search.scss'

export const Search = () => {

    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {

        const searchTerm = async () => {

        }

        const delayFn = setTimeout(() => {
            if (searchTerm) {
                console.log('aca: ', searchTerm);
            }
        }, 300)
        return () => clearTimeout(delayFn)
      }, [searchTerm])

    return(
        <div className="container mt-3">
            <div className="row">
                <div className="col">
                    <h4 className="text-center">
                        Search music
                    </h4>
                    <hr />
                    <input autoFocus type="text" autoComplete='off'
                        className="search-input" placeholder='Enter your song...'
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {loading && <Loading/>}
                </div>
            </div>
        </div>
    )
}
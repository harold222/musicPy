import { SearchProvider } from './context/Search.context';
import { SongSearch } from "./components/song-search";
import './Search.scss';
import { Loading } from '../../components/shared/Loading';

export const Search = () => {
    return (
        <SearchProvider>
            <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        <h4 className="text-center">
                            Search music
                        </h4>
                        <hr />
                        <SongSearch/>
                    </div>
                </div>
            </div>
            <Loading/>
        </SearchProvider>
    );
}
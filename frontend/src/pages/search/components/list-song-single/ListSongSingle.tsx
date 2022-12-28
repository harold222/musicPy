import ISongsSuggestion from '../../../../types/ISongsSuggestion';
import { FiPlayCircle, FiPauseCircle } from 'react-icons/fi';
import { FaEye } from 'react-icons/fa';
import { useState } from 'react';

interface ListSongSingleProps {
    song: ISongsSuggestion;
    isTouch: boolean;
    searchLink: (urlSong: string) => void;
    key: number;
}

export const ListSongSingle: React.FC<ListSongSingleProps> = ({ key, song, isTouch, searchLink }) => {

    const [clicked, setClicked] = useState<boolean>(false);

    const playSong = () => {
        setClicked(true);
        searchLink(song.url);
    }

    return (
        <div className='col list'>
            <div className="card h-100 bg-dark">
                <img className="card-img-top" src={song.thumbnail} alt={song.title}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "/no-image.png"
                    }}/>

                <div className="card-body list-desc">
                    <h5 className="card-title text-center">
                        <a className='list-desc-title' href={ song.channel }>
                            { song.title }
                        </a>
                    </h5>
                    <div className="row">
                        <div className="list-desc-info col-6 text-center">
                            <strong>{ song.author }</strong>
                            <div className='list-icon'>
                                <FaEye size={17} color='white' />
                                <span className='list-icon-views'>
                                    { song.views.toLocaleString(navigator.language, { maximumFractionDigits: 0 }) }
                                </span>
                            </div>
                        </div>
                        <div className="col-6 list-button">
                            <button className='list-button-action' onClick={playSong}>
                                {
                                    (isTouch && clicked) ?
                                        <FiPauseCircle size={50} color='red' /> :
                                        <FiPlayCircle size={50} color='red' />
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
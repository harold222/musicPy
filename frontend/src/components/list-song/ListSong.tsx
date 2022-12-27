import ISongsSuggestion from '../../types/ISongsSuggestion';
import React from 'react';
import { FaEye } from 'react-icons/fa';
import { FiPlayCircle } from 'react-icons/fi';
import './ListSong.scss';
import MusicService from '../../services/music.service';
import { ShareDataService } from '../../services/shareData.service';

interface ListSongProps {
    songs: ISongsSuggestion[];
}

export const ListSong: React.FC<ListSongProps> = ({ songs }) => {

    const a = (urlSong: string) => {
        ShareDataService.setSubject(urlSong);
        MusicService.downloadMusic(urlSong)
            .then(resp => {
                console.log('resp');
            }).catch(resp => {
                console.error(resp);
            })
    }

    return (
        <div className='container mt-4'>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {
                    songs.map((song, idx) =>
                        <div key={idx} className='col list'>
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
                                            <button className='list-button-action' onClick={() => a(song.url)}>
                                                <FiPlayCircle size={50} color='red' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};
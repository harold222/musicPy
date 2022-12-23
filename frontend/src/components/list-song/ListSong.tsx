import ISongsSuggestion from '../../types/ISongsSuggestion';
import React from 'react';
import ISearchSong from '../../types/ISearchSong.type';
import './ListSong.scss';

interface ListSongProps {
    songs: ISongsSuggestion[];
}

export const ListSong: React.FC<ListSongProps> = ({ songs }) => {

    return (
        <>
            {
                songs.map((song, idx) =>
                    <div key={idx} className='list'>
                        <div className='list-cover'>
                            <img src={song.thumbnail} alt={song.title}/>
                        </div>
                        <div className='list-desc'>
                            <h1>{ song.title }</h1>
                        </div>
                    </div>
                )
            }
        </>
    );
};
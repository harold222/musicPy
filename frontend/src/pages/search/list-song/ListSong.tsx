import ISongsSuggestion from '../../../types/ISongsSuggestion';
import React from 'react';
import './ListSong.scss';
import MusicService from '../../../services/music.service';
import { StatePlayButton } from '../../../services/shareData.service';
import { useState, useEffect } from 'react';
import { ListSongSingle } from '../list-song-single';

interface ListSongProps {
    songs: ISongsSuggestion[];
}

export const ListSong: React.FC<ListSongProps> = ({ songs }) => {

    const [touchSong, setTouchSong] = useState<boolean>(false);
    const subscription$ = StatePlayButton.getSubject();

    useEffect(() => {
        const currentSub = subscription$.subscribe(setTouchSong);
        return () => currentSub.unsubscribe();
    })
    
    const searchLink = (urlSong: string) => {
        StatePlayButton.setSubject(true);

        MusicService.downloadMusic(urlSong)
            .then(resp => {
                const blobUrl = URL.createObjectURL(resp.data);
                let a = new Audio(blobUrl);
            }).catch(resp => {
                console.error(resp);
            })
    }

    return (
        <div className='container mt-4'>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {
                    songs.map((song, idx) =>
                        <ListSongSingle key={idx} song={song} isTouch={touchSong} searchLink={searchLink}  />
                    )
                }
            </div>
        </div>
    );
};
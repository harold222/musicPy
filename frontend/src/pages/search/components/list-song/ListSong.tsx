import ISongsSuggestion from '../../../../types/ISongsSuggestion';
import './ListSong.scss';
import MusicService from '../../../../services/music.service';
import { StatePlayButton } from '../../../../services/shareData.service';
import { useState, useEffect } from 'react';
import { ListSongSingle } from '../list-song-single';
import { useSearchContext } from '../../context/Search.context';


export const ListSong = () => {

    const { allResults } = useSearchContext();

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
                    allResults.map((song, idx) =>
                        <ListSongSingle key={idx} song={song} isTouch={touchSong} searchLink={searchLink}  />
                    )
                }
            </div>
        </div>
    );
};
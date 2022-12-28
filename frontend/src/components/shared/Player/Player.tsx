import { useEffect } from 'react';
import './Player.scss'
import { StatePlayButton } from '../../../services/shareData.service';

export const Player = () => {

    const subscription$ = StatePlayButton.getSubject();

    useEffect(() => {
        const currentSub = subscription$.subscribe(resp => {

        })

        return () => currentSub.unsubscribe();
    }, [])
    

    return (
        <>
            test
        </>
    );
}
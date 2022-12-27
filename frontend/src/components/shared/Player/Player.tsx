import { useEffect } from 'react';
import './Player.scss'
import { ShareDataService } from '../../../services/shareData.service';

export const Player = () => {

    const subscription$ = ShareDataService.getSubject();

    useEffect(() => {
        subscription$.subscribe(resp => {
            console.log('es: ', resp)
        })
    })
    

    return (
        <>
    test
        </>
    );
}
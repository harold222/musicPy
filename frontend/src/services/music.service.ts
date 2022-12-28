import http from '../http-common'
import ISearchSong from '../types/ISearchSong.type'
import ISearchSuggestions from '../types/ISearchSuggestions.type';

class MusicService {
    searchSuggestion = (term: string) => 
        http.get<ISearchSuggestions>(`/search_suggestion?term=${term}`);

    searchMusic = (term: string) =>
        http.get<ISearchSong>(`/search_music?term=${term}`);

    downloadMusic = (url: string) =>
        http.post<any>(`/download_music`, { url }, { responseType: 'blob' });
}

export default new MusicService();
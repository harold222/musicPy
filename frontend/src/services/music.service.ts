import http from '../http-common'
import ISearchTerm from '../types/ISearchTerm.type'

class MusicService {
    search = (term: string) =>
        http.get<ISearchTerm>(`/search_music?term=${term}`)
}

export default new MusicService();
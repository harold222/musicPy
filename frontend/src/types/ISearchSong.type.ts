import ISongsSuggestion from "./ISongsSuggestion";

export default interface ISearchSong {
    total: number;
    results: ISongsSuggestion[];
}
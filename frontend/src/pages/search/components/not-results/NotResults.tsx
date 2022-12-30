import { useSearchContext } from '../../context/Search.context';

export const NotResults = () => {

    const { notResults } = useSearchContext();

    return (
        <>
            {
                notResults &&
                <span className="badge rounded-pill text-bg-danger">
                    No results found
                </span>
            }
        </>
    );
}
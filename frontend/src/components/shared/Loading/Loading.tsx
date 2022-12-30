import './Loading.scss';
import { useSearchContext } from '../../../pages/search/context/Search.context';

export const Loading = () => {

    const { loading } = useSearchContext();

    return (
       <>
            {
                loading &&
                    <div className="cssload-container">
                        <div className="cssload-whirlpool"></div>
                    </div>
            }
       </>
    )
}
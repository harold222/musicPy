import { Loading } from "../shared/Loading"

export const Search = () => {

    return(
        <div className="container mt-3">
            <div className="row">
                <div className="col">
                    <h4 className="text-center">
                        Search music
                    </h4>
                    <hr />
                    <input type="text" />

                    <Loading/>
                </div>
            </div>
        </div>
    )
}
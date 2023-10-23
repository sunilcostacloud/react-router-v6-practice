import { Link, useLocation, useLoaderData } from "react-router-dom"
import { getVans } from "../../api";

export async function loader({ params }) {
    // console.log("checkParams", params)
    return getVans(params.id)
}

const VanDetail = () => {
    const location = useLocation();
    const van = useLoaderData();
    console.log("data", van)

    const search = location?.state?.search || "";
    const type = location?.state?.type || "all";

    return (
        <>
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} vans</span>
            </Link>
            {van ?
                <div className="van-detail-container">
                    <div className="van-detail">
                        <img src={van?.imageUrl} />
                        <i className={`van-type ${van?.type} selected`}>
                            {van?.type}
                        </i>
                        <h2>{van?.name}</h2>
                        <p className="van-price"><span>${van?.price}</span>/day</p>
                        <p>{van?.description}</p>
                        <button className="link-button">Rent this van</button>
                    </div>
                </div> : <div>Loading...</div>
            }
        </>
    )
}

export default VanDetail
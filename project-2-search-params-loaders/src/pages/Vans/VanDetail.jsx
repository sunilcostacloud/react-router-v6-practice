import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom"

const VanDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const [van, setVan] = useState(null);
    console.log("check Location", location)

    const search = location?.state?.search || "";
    const type = location?.state?.type || "all";

    useEffect(() => {
        fetch(`/api/vans/${id}`).then(res => res.json()).then(data => setVan(data.vans))
    }, [id])

    // console.log(van)

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
import { useEffect, useState } from "react";
import { Link, useParams, Outlet, NavLink } from "react-router-dom";

const HostVanDetail = () => {
    const { id } = useParams()

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    const [currentVan, setCurrentVan] = useState(null);

    useEffect(() => {
        fetch(`/api/host/vans/${id}`).then(res => res.json()).then(data => setCurrentVan(data.vans))
    }, [])

    if (!currentVan) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <section>
                <Link
                    to="/host/vans"
                    relative="path"
                    className="back-button"
                >&larr; <span>Back to all vans</span>
                </Link>
                {currentVan ? (
                    <div className="host-van-detail-layout-container">
                        <div className="host-van-detail">
                            <img src={currentVan.imageUrl} />
                            <div className="host-van-detail-info-text">
                                <i
                                    className={`van-type van-type-${currentVan.type}`}
                                >
                                    {currentVan.type}
                                </i>
                                <h3>{currentVan.name}</h3>
                                <h4>${currentVan.price}/day</h4>
                            </div>
                        </div>

                        <nav className="host-van-detail-nav">
                            <NavLink
                                to="."
                                end
                                style={({ isActive }) => isActive ? activeStyles : null}
                            >
                                Details
                            </NavLink>
                            <NavLink
                                to="pricing"
                                style={({ isActive }) => isActive ? activeStyles : null}
                            >
                                Pricing
                            </NavLink>
                            <NavLink
                                to="photos"
                                style={({ isActive }) => isActive ? activeStyles : null}
                            >
                                Photos
                            </NavLink>
                        </nav>

                        <div>
                            <Outlet context={{ currentVan }} />
                        </div>

                    </div>

                ) : (<div>Loading..</div>)}
            </section>
        </div>
    )
}

export default HostVanDetail
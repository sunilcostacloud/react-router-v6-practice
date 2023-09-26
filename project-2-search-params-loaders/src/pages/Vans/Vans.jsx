import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { getVans } from "../../api";

const Vans = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();

    const typeFilter = searchParams.get("type");

    console.log("check type filter", typeFilter)
    console.log("check search params", searchParams.toString())


    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    const [vans, setVans] = useState([])

    useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVans()
                setVans(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVans()
    }, [])

    const displayedVans = typeFilter ? vans.filter(van => van.type === typeFilter) : vans

    const vanElements = displayedVans?.map(van => (
        <div key={van.id} className="van-tile">
            <Link
                to={van.id}
                state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
            >
                <img src={van.imageUrl} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ))

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>{error.message}</h1>
    }

    return (
        <>
            <div className="van-list-container">
                <h1>Explore our van options</h1>
                <div className="van-list-filter-buttons">
                    <Link
                        to="?type=simple"
                        className="van-type simple"
                    >
                        Simple
                    </Link>
                    <button
                        onClick={() => setSearchParams("?type=luxury")}
                        className="van-type simple"
                    >
                        Luxury
                    </button>
                    <button
                        onClick={() => setSearchParams({ type: "simple" })} // in buttons this is most preferred
                        className="van-type simple"
                    >
                        Simple 2
                    </button>
                    <Link
                        to="?type=rugged"
                        className="van-type simple"
                    >
                        Rugged
                    </Link>
                    <button
                        onClick={() => setSearchParams("")}
                        className="van-type simple"
                    >
                        Clear Filter
                    </button>
                    <Link
                        to="."
                        className="van-type simple"
                    >
                        Clear Filter 2
                    </Link>
                    <button
                        onClick={() => setSearchParams({})}
                        className="van-type simple"
                    >
                        Clear Filter 3
                    </button>
                </div>
                <hr />

                {/* the below code is very efficient because it will give flexibility to use with search params more than 1 */}

                <div className="van-list-filter-buttons">
                    <button
                        onClick={() => handleFilterChange("type", "simple")}
                        className={
                            `van-type simple 
                        ${typeFilter === "simple" ? "selected" : ""}`
                        }
                    >Simple</button>
                    <button
                        onClick={() => handleFilterChange("type", "luxury")}
                        className={
                            `van-type luxury 
                        ${typeFilter === "luxury" ? "selected" : ""}`
                        }
                    >Luxury</button>
                    <button
                        onClick={() => handleFilterChange("type", "rugged")}
                        className={
                            `van-type rugged 
                        ${typeFilter === "rugged" ? "selected" : ""}`
                        }
                    >Rugged</button>

                    {typeFilter ? (
                        <button
                            onClick={() => handleFilterChange("type", null)}
                            className="van-type clear-filters"
                        >Clear filter</button>
                    ) : null}

                </div>
                <div className="van-list">
                    {vanElements}
                </div>
            </div>
        </>
    )
}

export default Vans
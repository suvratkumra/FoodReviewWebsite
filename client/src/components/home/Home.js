
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/authContext/AuthContext';
import axios from 'axios';
import { RestContext } from '../../contexts/restaurantContext/RestContext';
import loadingImage from '../../images/loading-sign.png'

const Home = () => {
    const { state, getLocationAction, getRestaurantsNearbyAction } = useContext(RestContext);
    const [displayLoading, setDisplayLoading] = useState(true);

    useEffect(() => {
        getLocationAction().then(() => {
            console.log("done this")
            getRestaurantsNearbyAction().then(() => {
                console.log(displayLoading);
                setDisplayLoading(false);
            });
        })
    }, [state.location])

    return (
        <>
            <h1>Welcome to the food review app {state?.username} </h1>
            {/* <button>
                Continue with your list
            </button>
            <Link to="/newList">
                <button>
                    Make a new list
                </button>
            </Link> */}
            <h1>Click on any restaurant to start creating your list</h1>
            {displayLoading && <img src={loadingImage} alt="Loading" />}
            {state.restaurants_nearby_names?.map((value) => {
                return (
                    <h1 key={value}> {value} </h1>
                )
            })}
        </>
    )
}

export default Home

import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/authContext/AuthContext';
import axios from 'axios';
import { RestContext } from '../../contexts/restaurantContext/RestContext';
// import {}

const Home = () => {
    const { state } = useContext(AuthContext);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);
    const { getRestaurantsNearbyAction } = useContext(RestContext);

    // useEffect to run as soon as the page is loaded to get the user location
    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        setLatitude(position.coords.latitude);
                        setLongitude(position.coords.longitude);
                    },
                    error => {
                        setError(error.message);
                    }
                );
            } else {
                setError('Geolocation is not supported by your browser.');
            }
        };
        getLocation();
    }, []);

    // another effect hook which will take care of nearby restaurants.
    useEffect(() => {
        const getRestaurants = () => {
            getRestaurantsNearbyAction(latitude, longitude)
                .then((response) => {
                    console.log("here " + response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        getRestaurants();

    }, [latitude, longitude, getRestaurantsNearbyAction])

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
            {latitude}, {longitude}
            {/* display the extracted restaurant here!. */}
        </>
    )
}

export default Home
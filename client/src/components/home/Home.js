
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/authContext/AuthContext';
import axios from 'axios';
import { RestContext } from '../../contexts/restaurantContext/RestContext';
import loadingImage from '../../images/loading-sign.png'

const Home = () => {
    const { state } = useContext(AuthContext);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);
    const [radius, setRadius] = useState(200);
    const [nextPageToken, setNextPageToken] = useState();
    const [restaurantNames, setRestaurantNames] = useState([]);
    const [displayLoading, setDisplayLoading] = useState(true);
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
            getRestaurantsNearbyAction(latitude, longitude, radius, nextPageToken)
                .then((response) => {
                    // response format: array of objects specifying every restaurant within "radius" metres
                    const names = response.map((value) => value.name);
                    setRestaurantNames(names);
                    setDisplayLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        getRestaurants();

    }, [latitude, longitude, restaurantNames, getRestaurantsNearbyAction, nextPageToken, radius])

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
            {displayLoading && <img src={loadingImage} alt="Loading image" />}
            {restaurantNames?.map((value) => {
                return (
                    <h1 key={value}> {value} </h1>
                )
            })}
            {/* display the extracted restaurant here!. */}
        </>
    )
}

export default Home
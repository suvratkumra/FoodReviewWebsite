
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/authContext/AuthContext';
import axios from 'axios';
import { RestContext } from '../../contexts/restaurantContext/RestContext';
import loadingImage from '../../images/loading-sign.png'

const Home = () => {
    const { setRadiusAction, state, getLocationAction, getRestaurantsNearbyAction } = useContext(RestContext);
    const [displayLoading, setDisplayLoading] = useState(true);
    const [error, setError] = useState("")
    const [radius, setRadius] = useState({ actualValue: 200, tempValue: 200 });

    useEffect(() => {
        setRadiusAction(radius.actualValue);
        getLocationAction().then(() => {
            // console.log("done this")
            if (state.latitude && state.longitude) {
                // console.log(state.latitude, state.longitude)
                getRestaurantsNearbyAction().then(() => {
                    console.log(displayLoading);
                    setDisplayLoading(false);
                })
                    .catch((err) => {
                        setError(err);
                    });
            }
        })
            .catch((err) => {
                setError(err);
            })
    }, [state.latitude, state.longitude, radius.actualValue])

    const handleRadiusOnChangeAction = (event) => {
        // console.log(event.target.value);
        setRadius({
            ...radius,
            tempValue: event.target.value
        });
    }

    const handleUpdatedRadiusAction = (event) => {
        setRadius({
            ...radius,
            actualValue: radius.tempValue
        })
    }

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
            <p> Update the radius here for your search. </p>
            <input type='range' id="range" min={200} max={2000} step={100} onChange={handleRadiusOnChangeAction} />
            <input type='button' name="submitRadius" id="submitRadius" onClick={handleUpdatedRadiusAction} placeholder='Click to update radius' />
            {displayLoading && <img src={loadingImage} alt="Loading" />}
            {state.restaurants_nearby_names?.map((value, index) => {
                return (
                    <h1 key={`${value} ${index}`}> {value} </h1>
                )
            })}
        </>
    )
}

export default Home
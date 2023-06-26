
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { RestContext } from '../../contexts/restaurantContext/RestContext';
import loadingImage from '../../images/loading-sign.png'
import { ListContext } from '../../contexts/listContext/ListContext';
import { AuthContext } from '../../contexts/authContext/AuthContext';
import axios from 'axios';

const Home = () => {
    const { setRadiusAction, state, getLocationAction, searchRestaurantAction, getRestaurantsNearbyAction, } = useContext(RestContext);
    const [displayLoading, setDisplayLoading] = useState(true);
    const [error, setError] = useState("")
    const [radius, setRadius] = useState({ actualValue: 200, tempValue: 200 });
    const [runLocationFnAgain, setRunLocationFnAgain] = useState(true);

    const [searchBarInput, setSearchBarInput] = useState("");

    // LIST CONTEXT
    const listDetails = useContext(ListContext)
    const listState = listDetails.state;
    const createNewListAction = listDetails.createNewListAction;

    const { setUserTaskAction, USERTASKS } = useContext(AuthContext);

    useEffect(() => {
        getLocationAction().then(() => {
            if (state.latitude && state.longitude) {
                // (state.latitude, state.longitude)
                locationNearbyAction();
            }
            setRunLocationFnAgain(false);
        })
            .catch((err) => {
                setError(err);
            })


        const locationNearbyAction = () => {
            getRestaurantsNearbyAction().then(() => {
                setDisplayLoading(false);
            })
                .catch((err) => {
                    setError(err);
                });
        }
    }, [state.radius, runLocationFnAgain])

    useEffect(() => {
        setRadiusAction(radius.actualValue)
    }, [radius.actualValue])

    const handleRadiusOnChangeAction = (event) => {
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

    // use the index to find the restaurant details from the object we already have in restaurant context.
    const handleNewListButtonOnClick = (restName, restIndex) => {
        createNewListAction(restName, restIndex);
        setUserTaskAction(USERTASKS.CREATE_NEW_LIST, restName, restIndex);
    }



    const handleSearchSubmitting = () => {
        searchRestaurantAction(searchBarInput)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <h1>Welcome to the food review app </h1>
            <label htmlFor='search-bar'>Search: </label>
            <input type='search' id='search' onChange={(event)=>setSearchBarInput(event.target.value)}></input>
            <button onClick={handleSearchSubmitting}> Search </button>

            <h1>Click on any restaurant to start creating your list</h1>

            <p> Update the radius here for your search. </p>

            <input type='range' id="range" min={200} max={2000} step={100} onChange={handleRadiusOnChangeAction} />

            <input type='button' name="submitRadius" id="submitRadius" onClick={handleUpdatedRadiusAction} placeholder='Click to update radius' />
            {displayLoading && <img src={loadingImage} alt="Loading" />}
            {state.restaurants_nearby_names?.map((value, index) => {
                return (
                    <div style={{ border: "2px solid black", margin: "10px 5px", padding: "20px 5px", display: 'flex', justifyContent: 'space-around' }}>
                        <span style={{ fontSize: "1.5rem" }} key={`${value} ${index}`}> {value} </span>
                        <Link to={`/new/list?restaurant=${value}&index=${index}`}>
                            <button onClick={() => handleNewListButtonOnClick(value, index)}>Create a new list</button>
                        </Link>

                    </div>
                )
            })}
        </>
    )
}

export default Home
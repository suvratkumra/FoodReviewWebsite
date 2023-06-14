
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { RestContext } from '../../contexts/restaurantContext/RestContext';
import loadingImage from '../../images/loading-sign.png'
import { ListContext } from '../../contexts/listContext/ListContext';

const Home = () => {
    const { setRadiusAction, state, getLocationAction, getRestaurantsNearbyAction } = useContext(RestContext);
    const [displayLoading, setDisplayLoading] = useState(true);
    const [error, setError] = useState("")
    const [radius, setRadius] = useState({ actualValue: 200, tempValue: 200 });
    const [runLocationFnAgain, setRunLocationFnAgain] = useState(true);

    // LIST CONTEXT
    const listDetails = useContext(ListContext)
    const listState = listDetails.state;
    const createNewListAction = listDetails.createNewListAction;


    useEffect(() => {
        getLocationAction().then(() => {
            console.log(state.latitude, state.longitude, state.radius);
            if (state.latitude && state.longitude) {
                // console.log(state.latitude, state.longitude)
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

    // use the index to find the restaurant details from the object we already have in restaurant context.
    const handleNewListButtonOnClick = (restName, restIndex) => {
        createNewListAction(restName, restIndex);
        window.location.href = `/new/list?restaurant=${restName}&index=${restIndex}`;
    }

    return (
        <>
            <h1>Welcome to the food review app </h1>
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
                    <div style={{ border: "2px solid black", margin: "10px 5px", padding: "20px 5px", display: 'flex', justifyContent: 'space-around' }}>
                        <span style={{ fontSize: "1.5rem" }} key={`${value} ${index}`}> {value} </span>
                        <button onClick={() => handleNewListButtonOnClick(value, index)}> Create a new list </button>
                    </div>
                )
            })}
        </>
    )
}

export default Home
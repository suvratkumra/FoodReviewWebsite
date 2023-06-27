import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { RestContext } from '../../contexts/restaurantContext/RestContext';
import loadingImage from '../../images/loading-sign.png';
import { ListContext } from '../../contexts/listContext/ListContext';
import { AuthContext } from '../../contexts/authContext/AuthContext';

const Home = () => {
    const { setRadiusAction, state, getLocationAction, searchRestaurantAction, getRestaurantsNearbyAction } = useContext(RestContext);
    const [displayLoading, setDisplayLoading] = useState(true);
    const [error, setError] = useState('');
    const [radius, setRadius] = useState({ actualValue: 200, tempValue: 200 });
    const [runLocationFnAgain, setRunLocationFnAgain] = useState(true);

    const [searchBarInput, setSearchBarInput] = useState('');

    // LIST CONTEXT
    const listDetails = useContext(ListContext);
    const listState = listDetails.state;
    const createNewListAction = listDetails.createNewListAction;

    const { setUserTaskAction, USERTASKS } = useContext(AuthContext);

    useEffect(() => {
        getLocationAction()
            .then(() => {
                if (state.latitude && state.longitude) {
                    // (state.latitude, state.longitude)
                    locationNearbyAction();
                }
                setRunLocationFnAgain(false);
            })
            .catch((err) => {
                setError(err);
            });

        const locationNearbyAction = () => {
            getRestaurantsNearbyAction()
                .then(() => {
                    setDisplayLoading(false);
                })
                .catch((err) => {
                    setError(err);
                });
        };
    }, [state.radius, runLocationFnAgain]);

    useEffect(() => {
        setRadiusAction(radius.actualValue);
    }, [radius.actualValue]);

    const handleRadiusOnChangeAction = (event) => {
        setRadius({
            ...radius,
            tempValue: event.target.value,
        });
    };

    const handleUpdatedRadiusAction = (event) => {
        setRadius({
            ...radius,
            actualValue: radius.tempValue,
        });
    };

    // use the index to find the restaurant details from the object we already have in restaurant context.
    const handleNewListButtonOnClick = (restName, restIndex) => {
        createNewListAction(restName, restIndex);
        setUserTaskAction(USERTASKS.CREATE_NEW_LIST, restName, restIndex);
    };

    const handleSearchSubmitting = () => {
        if (searchBarInput !== '') {
            searchRestaurantAction(searchBarInput)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            getRestaurantsNearbyAction()
                .then(() => {
                    setDisplayLoading(false);
                })
                .catch((err) => {
                    setError(err);
                });
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl text-center py-8">Welcome to the food review app</h1>
                <div className="flex justify-center pb-4">
                    <label htmlFor="search-bar" className="text-gray-700 mr-2 self-center">
                        Search:
                    </label>
                    <div className="flex">
                        <input
                            type="search"
                            id="search"
                            onChange={(event) => setSearchBarInput(event.target.value)}
                            className="border border-gray-300 rounded-l px-4 py-2 w-64 focus:outline-none"
                        />
                        <button
                            onClick={handleSearchSubmitting}
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-r"
                        >
                            Search
                        </button>
                    </div>
                </div>
                <h1 className="text-2xl text-center py-4">Click on any restaurant to start creating your list</h1>
                <p className="text-center pb-4">Update the radius here for your search.</p>
                <div className="flex justify-center items-center pb-4">
                    <input
                        type="range"
                        id="range"
                        min={200}
                        max={2000}
                        step={100}
                        onChange={handleRadiusOnChangeAction}
                        className="w-64"
                    />
                    <label htmlFor='range'> <span className='text-gray-600 text-xl'>{radius.tempValue}m</span> </label>
                    <button
                        type="button"
                        name="submitRadius"
                        id="submitRadius"
                        onClick={handleUpdatedRadiusAction}
                        className="ml-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                    >
                        Click to update radius
                    </button>
                </div>
                {displayLoading && <img src={loadingImage} alt="Loading" className="mx-auto" />}
                <div className="flex flex-col items-center">
                    {state.restaurants_nearby_names?.map((value, index) => (
                        <div
                            key={`${value} ${index}`}
                            className="border border-gray-400 rounded-lg my-4 p-4 flex justify-between items-center w-full md:w-3.5"
                        >
                            <span className="text-xl">{value}</span>
                            <Link
                                to={`/new/list?restaurant=${value}&index=${index}`}
                                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                            >
                                Create a new list
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;

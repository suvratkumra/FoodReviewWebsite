import axios from "axios";
import { createContext, useReducer } from "react";

export const RestContext = createContext();

const INITIAL_STATE = {
    restaurants_nearby_names: [null],
    restaurants_nearby_details: [null],
    location: null,
    radius: 200,
    pageToken: null,
    error: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case "RESTAURANT_DETAILS_SUCCESS": {
            return {
                ...state,
                restaurants_nearby_details: action.payload
            }
        }
        case "RESTAURANT_DETAILS_FAILED": {
            return {
                ...state,
                error: action?.payload
            }
        }
        case "EXTRACT_NAMES_SUCCESS": {
            return {
                ...state,
                restaurants_nearby_names: action?.payload
            }
        }
        case "LOCATION_EXTRACTED_SUCCESS": {
            return {
                ...state,
                location: action?.payload?.latitude + "%2C" + action?.payload?.longitude
            }
        }
        case "LOCATION_EXTRACTED_FAILED": {
            return {
                ...state,
                error: action?.error
            }
        }
        default: {
            return state;
        }
    }
}


const RestContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const getRestaurantsNearbyAction = () => {
        return new Promise((resolve, reject) => {
            if (state.location && state.radius) {
                axios.get(`http://localhost:3000/v1/restaurant/nearby?location=${state.location}&radius=${state.radius}&pageToken=${state.pageToken}`)
                    .then((response) => {
                        const result = response.data.response[0].dataReceived.results
                        dispatch({
                            type: "RESTAURANT_DETAILS_SUCCESS",
                            payload: result
                        })
                        extractRestaurantNamesAction(result);
                        resolve(result);
                    })
                    .catch((error) => {
                        dispatch({
                            type: "RESTAURANT_DETAILS_FAILED",
                            payload: error
                        })
                        reject(error);
                    })
            }
        });
    }

    /**
    * To extract the names of the restaurants from the result.
    */
    const extractRestaurantNamesAction = (restDetails) => {
        const names = restDetails.map((value) => value.name);
        dispatch({
            type: "EXTRACT_NAMES_SUCCESS",
            payload: names
        })
    }

    /**
     * Extract the location of the user
     * */
    const getLocationAction = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        dispatch({
                            type: "LOCATION_EXTRACTED_SUCCESS",
                            payload: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            }
                        })
                        resolve(state);
                    },
                    error => {
                        dispatch({
                            type: "LOCATION_EXTRACTED_FAILED",
                            payload: error
                        })
                        reject(state);
                    }
                );
            } else {
                console.log("HERE")
                dispatch({
                    type: "LOCATION_EXTRACTED_FAILED",
                    payload: "Geolocation is not supported by your browser"
                })
                reject(state);

            }

        })
    }

    return (
        <RestContext.Provider value={{ state, getLocationAction, extractRestaurantNamesAction, getRestaurantsNearbyAction }}>
            {children}
        </RestContext.Provider>
    )
}

export default RestContextProvider;
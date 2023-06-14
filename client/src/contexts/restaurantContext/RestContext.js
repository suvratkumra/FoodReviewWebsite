import axios from "axios";
import { createContext, useReducer } from "react";

export const RestContext = createContext();

const INITIAL_STATE = {
    restaurants_nearby_names: [null],
    restaurants_nearby_details: [null],
    latitude: null,
    longitude: null,
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
                latitude: action?.payload?.latitude,
                longitude: action?.payload?.longitude
            }
        }
        case "LOCATION_EXTRACTED_FAILED": {
            return {
                ...state,
                error: action?.payload
            }
        }
        case "UPDATE_RADIUS": {
            return {
                ...state,
                restaurants_nearby_details: [null],
                restaurants_nearby_names: [null],
                radius: action?.payload
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
            if (state.latitude && state.longitude && state.radius) {
                axios.get(`http://localhost:3000/v1/restaurant/nearby?latitude=${state.latitude}&longitude=${state.longitude}&radius=${state.radius}`)
                    .then((response) => {
                        const result = response.data.response[0].data
                        console.log(result);
                        dispatch({
                            type: "RESTAURANT_DETAILS_SUCCESS",
                            payload: result
                        })
                        extractRestaurantNamesAction(result);
                        resolve(response);
                    })
                    .catch((error) => {
                        console.log(error)
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
        const names = restDetails?.businesses?.map((value) => value.name);
        dispatch({
            type: "EXTRACT_NAMES_SUCCESS",
            payload: names
        })
        // console.log(names);
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
                // console.log("HERE")
                dispatch({
                    type: "LOCATION_EXTRACTED_FAILED",
                    payload: "Geolocation is not supported by your browser"
                })
                reject(state);

            }

        })
    }


    // GETTERS AND SETTERS
    const setRadiusAction = (radius) => {
        dispatch({
            type: "UPDATE_RADIUS",
            payload: radius
        })
    }

    return (
        <RestContext.Provider value={{ setRadiusAction, state, getLocationAction, extractRestaurantNamesAction, getRestaurantsNearbyAction }}>
            {children}
        </RestContext.Provider>
    )
}

export default RestContextProvider;
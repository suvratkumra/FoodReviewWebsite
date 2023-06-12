import axios from "axios";
import { createContext, useReducer } from "react";

export const RestContext = createContext();

const INITIAL_STATE = {
    restaurants_nearby_names: [null],
    restaurants_nearby_details: [null],
    error: null,
}

const reducer = (state, action) => {
    switch (action.type) {

    }
}


const RestContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const getRestaurantsNearbyAction = (latitude, longitude) => {
        return new Promise((resolve, reject) => {
            if (latitude && longitude) {
                const location = latitude + "%2C" + longitude;
                axios.get(`http://localhost:3000/v1/restaurant/nearby?location=${location}&radius=200`)
                    .then((response) => {
                        resolve(JSON.stringify(response.data.response[0].dataReceived));
                    })
                    .catch((error) => {
                        reject(error);
                    })
            }
        });
    }

    return (
        <RestContext.Provider value={{ state, getRestaurantsNearbyAction }}>
            {children}
        </RestContext.Provider>
    )
}

export default RestContextProvider;
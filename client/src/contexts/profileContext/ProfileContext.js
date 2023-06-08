import axios from "axios";
import { createContext, useReducer, useContext } from "react";
import { AuthContext } from "../authContext/AuthContext";


const INITIAL_STATE = {
    email: null,
    username: null, 
    profilePic: null,
    address: null,
    phoneNumber: null, 
    lists: [null],
    verification: null,
    feedback: null
}

export const ProfileContext = createContext();

const reducer = (state, action) => {
    switch (action.type)
    {
        case "GET_PROFILE_SUCCESS": {
            return {
                ...state,
                email: action.payload
            }
        }
    }
}

const ProfileContextProvider = ({children}) => {

    const details = useContext(AuthContext);
    const userState = details.state;

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const getProfileDetailsAction = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": userState.token
            },
        };
        try {
            const response = await axios.get(`http://localhost:3000/v1/profile/${userState.profileID}`, config);

            console.log(response.data.response[0].userProfile);
            dispatch({
                type: "GET_PROFILE_SUCCESS",
                payload: response?.data?.response[0]?.userProfile
            });
            console.log("State ", userState);

        } catch (error) {
            // handle the error
        }

    }

    return (
        <ProfileContext.Provider value = {{state, getProfileDetailsAction}}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileContextProvider;
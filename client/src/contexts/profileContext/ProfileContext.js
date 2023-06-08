import axios from "axios";
import { createContext, useReducer, useContext } from "react";
import { AuthContext } from "../authContext/AuthContext";


const INITIAL_STATE = {
    entireProfileExtracted: false, 
    email: null,
    username: null,
    profilePic: null,
    address: null,
    phoneNumber: null,
    lists: [null],
    verification: null,
    feedback: null,
    error: null
}

export const ProfileContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "GET_PROFILE_SUCCESS": {
            return {
                ...state,
                entireProfileExtracted: true,
                email: action.payload.email,
                username: action.payload.username,
                profilePic: action.payload.profilePic,
                address: action.payload.address,
                phoneNumber: action.payload.phoneNumber,
                lists: action.payload.lists,
                verification: action.payload.verification,
                feedback: action.payload.feedback
            };
        }
        case "GET_PROFILE_REJECT": {
            return {
                ...state,
                error: action.payload.error
            }
        }
    }
}

const ProfileContextProvider = ({ children }) => {

    const details = useContext(AuthContext);
    const userState = details.state;

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const getProfileDetailsAction = async () => {
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": userState.token
                },
            };
            axios.get(`http://localhost:3000/v1/profile/${userState.profileID}`, config)
                .then((response) => {
                    dispatch({
                        type: "GET_PROFILE_SUCCESS",
                        payload: response?.data?.response[0]?.userProfile
                    });
                    resolve(state);
                })
                .catch((err) => {
                    dispatch({
                        type: "GET_PROFILE_REJECT",
                        payload: err
                    })
                    reject(state);
                });
        })

    }

    return (
        <ProfileContext.Provider value={{ state, getProfileDetailsAction }}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileContextProvider;
import { useReducer, createContext, useState } from 'react'
import { LOGIN_SUCCESS, LOGIN_FAILED, REGISTER_FAILED, REGISTER_SUCCESS } from './authActionConstants'
import axios from 'axios';

const INITIAL_STATE = {
    userID: null,
    token: null,
    loggedIn: false,

}

export const AuthContext = createContext();

const reducer = (state, action) => {
    // all the states we need to trigger go in here.
    switch (action.type) {
        // define the different action types here
        case LOGIN_SUCCESS: {
            return {
                ...state,
                userID: action.payload[0]._id,
                token: action.payload[1].token,
                loggedIn: true
            };
        }
        case LOGIN_FAILED: {
            return state;
        }
        case REGISTER_SUCCESS: {
            return state;
        }
        case REGISTER_FAILED: {
            return state;
        }
        default: {
            return state;
        }
    }
}

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const loginUserAction = async (formdata) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        // TODO: assuming all the form data is in correct form, it is checked on the login page.
        try {
            const res = await axios.post("http://localhost:3000/v1/user/login", formdata, config);
            if (res?.data?.status === 200) {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res?.data?.response
                })
            }

        }
        catch (e) {

            dispatch({
                type: "LOGIN_FAILED",
                payload: e?.message
            })
        }
    }

    return (<AuthContext.Provider value={{ loginUserAction, state }}> {children} </AuthContext.Provider>)
}

export default AuthContextProvider;
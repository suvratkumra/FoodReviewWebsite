import { useReducer, createContext, useState } from 'react'
import { LOGIN_SUCCESS, LOGIN_FAILED, REGISTER_FAILED, REGISTER_SUCCESS } from './authActionConstants'
import axios from 'axios';
import e from 'cors';

const INITIAL_STATE = {
    userID: null,
    token: null,
    loggedIn: false,
    error: { code: null, message: null }
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
                loggedIn: true,
                error: { code: null, message: null }
            };
        }
        case LOGIN_FAILED: {
            return {
                ...state,
                error: {
                    code: action?.payload?.code,
                    message: action?.payload?.message
                }
            }
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

        try {
            const res = await axios.post("http://localhost:3000/v1/user/login", formdata, config);
            if (res?.data?.status === 200) {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res?.data?.response
                })
            }

        }
        catch (error) {
            dispatch({
                type: "LOGIN_FAILED",
                payload: error
            })
            console.log(state);
        }
    }

    return (<AuthContext.Provider value={{ loginUserAction, state }}> {children} </AuthContext.Provider>)
}

export default AuthContextProvider;
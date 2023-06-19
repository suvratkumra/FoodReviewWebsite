import { useReducer, createContext, useState } from 'react'
import { LOGIN_SUCCESS, LOGIN_FAILED, REGISTER_FAILED, REGISTER_SUCCESS } from './authActionConstants'
import axios from 'axios';

const USERTASKS = {
    ACCESSING_EXISTING_LIST: "ACCESSING_EXISTING_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    NOTHING: "NOTHING"
}

const INITIAL_STATE = {
    createProfileCompleted: false,
    userID: null,
    profileID: null, // extract when the user logs in.
    username: null,
    token: null,
    loggedIn: false,
    error: { code: null, message: null },
    loggedOut: false,
    userTask: USERTASKS.NOTHING,
    userTaskDetails: null,
    verification: null,
    email: null,
}

export const AuthContext = createContext();

const reducer = (state, action) => {
    // all the states we need to trigger go in here.
    switch (action.type) {
        // define the different action types here
        case LOGIN_SUCCESS: {
            localStorage.setItem('token', action.payload[1].token);
            localStorage.setItem('userid', action.payload[0]._id);
            return {
                ...state,
                email: action?.payload[0]?.email,
                userID: action.payload[0]._id,
                profileID: action.payload[0].profileId,
                username: action.payload[0].username,
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
            localStorage.setItem('token', action.payload[1].token);
            localStorage.setItem('userid', action.payload[0]._id);
            localStorage.setItem('profileId', action?.payload[0]?.profileId)
            const newState = {
                ...state,
                createProfileCompleted: true,
                username: action?.payload[0]?.username,
                userID: action?.payload[0]?._id,
                profileID: action?.payload[0]?.profileId,
                token: action?.payload[1]?.token,
                email: action?.payload[0]?.email,
            }
            //console.log(newState);
            return newState;
        }
        case REGISTER_FAILED: {
            return {
                ...state,
                error: {
                    code: action?.payload?.code,
                    message: action?.payload?.message
                }
            }
        }

        case "LOGOUT_USER": {
            localStorage.removeItem('token');
            localStorage.removeItem('userid');
            return { ...INITIAL_STATE, loggedOut: true };
        }

        case "LOGOUT_USER_VARIABLE": {
            return { ...state, loggedOut: action.payload.value }
        }

        case "USERTASK_VARIABLE": {
            return {
                ...state,
                userTask: action.payload.value,
                userTaskDetails: {
                    restaurantName: action.payload.restName,
                    restaurantIndex: action.payload.restIndex
                }
            }
        }

        default: {
            return state;
        }
    }
}
const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const loginUserAction = async (formdata) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const res = await axios.post(
                "http://localhost:3000/v1/user/login",
                formdata,
                config
            );

            // console.log(res?.data?.response);

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: res?.data?.response,
            });

            return state;
        } catch (error) {
            dispatch({
                type: "LOGIN_FAILED",
                payload: error,
            });

            throw state;
        }
    };

    const registerUserAction = (formdata) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        return new Promise((resolve, reject) => {
            axios.post("http://localhost:3000/v1/user/create", formdata, config)
                .then((res) => {
                    dispatch({
                        type: "REGISTER_SUCCESS",
                        payload: res.data.response
                    })
                    if (state.createProfileCompleted) {
                        ;
                        resolve(state);
                    }
                    // console.log(";p: ", res.data.response);
                })
                .catch((error) => {
                    dispatch({
                        type: "REGISTER_FAILED",
                        payload: error
                    })
                    reject(error);
                });
        })
    };

    const deleteAllAuthAction = () => {
        // empty up the state.
        dispatch({
            type: "LOGOUT_USER"
        })
    }

    const setLogoutBooleanAction = (value) => {
        dispatch({
            type: "LOGOUT_USER_VARIABLE",
            payload: value
        });
    }

    const setUserTaskAction = (value, restName = "", restIndex = "") => {
        dispatch({
            type: "USERTASK_VARIABLE",
            payload: {
                value,
                restName,
                restIndex
            }
        })
        // console.log("suersafgsadf")
    }

    const verifyCodeAction = (verificationCode) => {
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    Authorization: state.token
                }
            }

            const payloadBody = {
                verificationCode: verificationCode
            }

            axios.post('http://localhost:3000/v1/user/verify-user', payloadBody, config).then((response) => {
                resolve();
            })
                .catch(() => {
                    reject();
                })
        })
    }

    const sendAnotherVerificationCodeAction = async () => {
        // extract the user profile 
        const profileId = state.profileID;
        console.log(profileId)

        const config = {
            headers: {
                Authorization: state.token
            }
        }

        axios.post('http://localhost:3000/v1/user/resend-verification-email', {}, config)
            .then((response) => {
                return true;
            })
            .catch((error) => {
                return false;
            })

    }

    return (
        <AuthContext.Provider value={{ sendAnotherVerificationCodeAction, setLogoutBooleanAction, deleteAllAuthAction, registerUserAction, loginUserAction, verifyCodeAction, state, setUserTaskAction, USERTASKS }}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthContextProvider;
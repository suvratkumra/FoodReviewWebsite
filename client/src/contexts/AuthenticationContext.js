import { createContext, useReducer } from "react";

// create a new context
export const AuthContext = createContext();

const INITIAL_STATE = {
    userAuthId: null,
    loading: false,
    jwtToken: null
}

// reducer is like an enum which is of action type called from dispatch
const reducer = (state, action) => {
    // console.log(state);
    // console.log(action);
    switch (action.type) {
        case 'UPDATE_JWT': {
            return { ...state, jwtToken: action.payload }
        }
    }
}

// provide some value to the context
const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const updateJWT = (token) => {
        dispatch({
            type: "UPDATE_JWT",
            payload: token
        });
        return "token updated"
    };

    return <AuthContext.Provider value={{ updateJWT, state }}> {children} </AuthContext.Provider>
}

export default AuthContextProvider;
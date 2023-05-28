import { createContext, useReducer } from "react";

// create a new context
export const AuthContext = createContext();

const INITIAL_STATE = {
    userAuth: null,
    error: null,
    loading: false,
    profile: null,
    jwtToken: null
}

// reducer is like an enum which is of action type called from dispatch
const reducer = (state, action) => {
    console.log(action);
}

// provide some value to the context
const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(() => { }, INITIAL_STATE);

    const add = (a, b) => { return a + b };

    return <AuthContext.Provider value={{ add }}> {children} </AuthContext.Provider>
}

export default AuthContextProvider;
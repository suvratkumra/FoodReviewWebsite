import { createContext, useReducer } from "react";

export const ListContext = createContext();

const INITIAL_STATE = {
    restaurant_name: null,
    restaurant_details: null,     // using id to find out more about the restaurant later.
}

const reducer = (state, action) => {
    switch (action.type) {
        case "CREATE_NEW_LIST": {
            return {
                ...state,
                restaurant_name: action.payload.name,
                restaurant_details: action.payload.details
            }
        }
    }
}

const ListContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const createNewListAction = (name, details) => {
        dispatch({
            type: "CREATE_NEW_LIST",
            payload: {
                name, details
            }
        })
    }

    return (
        <ListContext.Provider value={{ state, createNewListAction }}>
            {children}
        </ListContext.Provider>
    )
}

export default ListContextProvider;

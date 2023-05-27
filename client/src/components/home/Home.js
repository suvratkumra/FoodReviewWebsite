import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NewList from '../list/NewList'
const Home = () => {

    return (
        <>
            <h1>Welcome to the food review app</h1>
            <button>
                Continue with your list
            </button>
            <Link to="/newList">
                <button>

                    Make a new list
                </button>
            </Link>
        </>
    )
}

export default Home
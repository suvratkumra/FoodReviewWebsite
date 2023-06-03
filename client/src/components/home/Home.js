
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext/AuthContext';
const Home = () => {
    const { state } = useContext(AuthContext);
    return (
        <>
            <h1>Welcome to the food review app {state.token} </h1>
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
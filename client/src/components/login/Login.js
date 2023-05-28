import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthenticationContext'

const Login = () => {
    const { add } = useContext(AuthContext);
    console.log(add(1, 2))
    return (
        <div>Login</div>
    )
}

export default Login
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <div className="container mx-auto flex flex-col">
            <div className='text-gray-600 text-2xl p-10'>
                <h2 className="text-3xl font-bold mb-4">Error 404: Page Not Found</h2>
                Oops! The page you are looking for does not exist.
            </div>
            <button
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4"
                onClick={handleHomeClick}
            >
                Go to Home
            </button>
        </div>
    );
};

export default ErrorPage;

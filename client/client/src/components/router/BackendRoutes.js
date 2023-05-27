import axios from 'axios'

const BackendRoutes = () => {
    const handleClick = async () => {
        try {
            const response = await axios.get("http://localhost:8080/");
            console.log("you are good", response);
        } catch (error) {
            console.log("You are screwed", error);
        }
    };

    return (
        <>
            <button onClick={handleClick}>Button Value</button>
        </>
    );
};

export default BackendRoutes
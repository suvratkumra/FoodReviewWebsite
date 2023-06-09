import React from 'react'

const LogoutPopup = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <span
                style={{
                    color: "red",
                    backgroundColor: "black",
                    width: "100%",
                    height: "30px",
                    fontSize: "3rem",
                    textAlign: "center",
                }}
            >
                You have been successfully logged out.
            </span>
        </div>
    );
};


export default LogoutPopup
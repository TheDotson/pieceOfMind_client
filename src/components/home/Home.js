import React from 'react';

export const Home = props => {
  return (
    <>
      <h1>Home</h1>
      <button className="log-link fakeLink"
        onClick={() => {
            localStorage.removeItem("token")
            localStorage.removeItem("user_id")
            props.history.push({ pathname: "/" })
        }}
    >Logout Test</button>
    </>
  );
};

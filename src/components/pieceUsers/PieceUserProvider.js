import React, { useState } from 'react';

export const PieceUserContext = React.createContext();

const PieceUserProvider = (props) => {
  const [pieceUsers, setUsers] = useState([]);
  const [pieceUser, setUser] = useState({});

  const getPieceUser = (id) => {
    return fetch(`http://localhost:8000/pieceUsers/${id}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(setUser);
  };

  const getPieceUsers = () => {
    return fetch('http://localhost:8000/pieceUsers', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(setUsers);
  };

  const registerPieceUser = pieceUser => {
    return fetch('http://localhost:8000/register_pieceUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(pieceUser)
    })
      .then(res => res.json());
  };

  const updatePieceUser = pieceUser => {
    return fetch(`http://localhost:8000/pieceUsers/${pieceUser.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pieceUser)
    })
      .then(getPieceUser);
  };

  const deletePieceUser = id => {
    return fetch(`http://localhost:8000/pieceUsers/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
      .then(getPieceUsers);
  };

  return (
        <PieceUserContext.Provider value ={{
          pieceUser,
          pieceUsers,
          getPieceUser,
          getPieceUsers,
          registerPieceUser,
          updatePieceUser,
          deletePieceUser
        }}>
            {props.children}
        </PieceUserContext.Provider>
  );
};

export default PieceUserProvider;

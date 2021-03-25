import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Room extends React.Component {
  
  deleteRoom = () => {
    const { room, getRoomsByUser } = this.props;
    return fetch(`http://localhost:8000/rooms/${room.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`
      }
    })
    .then(() => getRoomsByUser())
  }

  render() {
    const { room } = this.props;
    const roomItems = `/roomItems/${room.id}`
    const editRoom = `/editRoom/${room.id}`
    return (
      <div className="card text-center collection-card">
        <div className="card-header"><h5>{room.name}</h5></div>
        <div className="card-body">
        <div className="card-footer">
          <Link to={roomItems}><button className="btn btn-primary" id={room.id}><i className="far fa-eye"></i></button></Link>
          <Link to={editRoom}><button className="btn btn-warning"><i className="far fa-edit"></i></button></Link>
          <button className="btn btn-danger" onClick={this.deleteRoom}><i className="fas fa-trash-alt"></i></button>
        </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Room);

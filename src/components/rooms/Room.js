import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Room extends React.Component {
  
  deleteRoom = () => {
    const { room, getAllRooms } = this.props;
    return fetch(`http://localhost:8000/rooms/${room.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`
      }
    })
    .then(() => getAllRooms())
  }

  render() {
    const { room } = this.props;
    const roomItems = `/roomItems/${room.id}`
    const editRoom = `/editRoom/${room.id}`
    return (
      <div className="d-flex justify-content-center room-list">
        <div className="btn-group-sm room-bg">
          <Link to={roomItems}><button className="btn-primary" id={room.id}> {room.name} </button></Link>
          <Link to={editRoom}><button className="btn-warning"><i className="fas fa-pen"></i></button></Link>
          <button className="btn-danger" onClick={this.deleteRoom}><i className="fas fa-skull"></i></button>
        </div>
      </div>
    )
  }
}

export default withRouter(Room);

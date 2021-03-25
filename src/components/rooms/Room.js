import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

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

  deleteRoomEvent = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Warning!</h1>
            <h3>Deleting the room will also delete all items that may be in it. <br/>Are you sure you want to proceed?</h3>
            <button className="mr-3 dialog-btn btn btn-secondary" onClick={onClose}><h4>No</h4></button>
            <button className="dialog-btn btn btn-danger"
              onClick={() => {
                this.deleteRoom();
                onClose();}}>
                  <h4>Yes, Delete this room</h4>
            </button>
          </div>
        );
      }
    });
  };


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
          <button className="btn btn-danger" onClick={this.deleteRoomEvent}><i className="fas fa-trash-alt"></i></button>
        </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Room);

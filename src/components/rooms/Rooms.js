import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Room from './Room';

class Rooms extends React.Component {
    state = {
        rooms: [],
    }

    componentDidMount() {
        this.getAllRooms();
    }

    getAllRooms = () => {
        return fetch("http://localhost:8000/rooms", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(res => {
            this.setState({ rooms: res.results })
        })
    }

    render() {
        const { rooms } = this.state;
        const newRoom = `/newRoom`
        const room = rooms.map ((room) => <Room key={room.id} getAllRooms={this.getAllRooms} room={room}/>)
        return(
            <div className="text-center">
                <h1 className="text-center mt-3">Tags</h1>
                <Link to={newRoom}><i className="fas fa-plus-square"></i> New Room</Link>
                <div className="room-container">
                    {room}
                </div>
            </div>
        )
    }
}

export default withRouter(Rooms);

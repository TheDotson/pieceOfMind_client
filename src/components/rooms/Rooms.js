import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Room from './Room';

class Rooms extends React.Component {
    state = {
        rooms: [],
    }

    componentDidMount() {
        this.getRoomsByUser();
    }

    getRoomsByUser = () => {
        const user = localStorage.getItem('user_id')
        return fetch(`http://localhost:8000/rooms?user=${user}`, {
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
        const room = rooms.map ((room) => <Room key={room.id} getRoomsByUser={this.getRoomsByUser} room={room}/>)
        return(
            <div className="text-center">
                <h1 className="text-center mt-3 headline">Rooms</h1>
                <Link to={newRoom}><i className="fas fa-plus-square mb-3"></i> New Room</Link>
                <div className="room-container">
                    {room}
                </div>
            </div>
        )
    }
}

export default withRouter(Rooms);

import React from 'react';
import { withRouter } from 'react-router-dom';

class NewRoom extends React.Component {
    state = {
        name: '',
        user: ''
    }

    changeNameEvent = (e) => {
        e.preventDefault();
        this.setState({ name: e.target.value });
    }

    createRoom = (e) => {
        e.preventDefault();
        const { name } = this.state
        const user = localStorage.getItem('user_id')

        const newRoom = {
            name: name,
            user: user
        }
        fetch("http://127.0.0.1:8000/rooms", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                newRoom
            )
        })
        .then(res => res.json())
        .then(res => {
            this.props.history.push('/rooms')
        })
    }

    render() {
        return(
            <div className="newRoomForm">
                <h2 className="text-center mt-3">Create New Room</h2>
                    <form className="col-4 realForm form-style" autoComplete="off">
                        <div className="form-group">
                            <label className="mt-3" htmlFor="name">Room Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Input Room Name"
                                onChange={this.changeNameEvent}
                            />
                        </div>
                        <button className="btn btn-success submit" onClick={this.createRoom}>Create Room</button>
                    </form>
            </div>
        )
    }
}

export default withRouter(NewRoom);

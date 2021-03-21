import React from 'react';
import { withRouter } from 'react-router-dom';

class EditRoom extends React.Component {
  state = {
    name: '',
  }

  componentDidMount() {
    this.getRoomById()
  }

  getRoomById = () => {
    const { roomId } = this.props.match.params;
    return fetch(`http://localhost:8000/rooms/${roomId}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`
      }
    })
    .then (res => res.json())
    .then(res => {
      this.setState({ name: res.name })
    })
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  editRoom = (e) => {
    e.preventDefault();
    const { name } = this.state
    const { roomId } = this.props.match.params;

    const editedRoom = {
      name: name,
    }

    fetch(`http://localhost:8000/rooms/${roomId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(
        editedRoom
      )
    })
    .then(res => {
      this.props.history.push(`/rooms`)
    })
  }

  render() {
    const { name } = this.state
    return (
      <div className="editRoomForm">
        <h2 className="text-center">Edit Room</h2>
        <div className="editFormContainer">
          <form className="col-4">
            <div className="form-group">
              <label htmlFor="name">Room Name Change</label>
              <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Room Name"
              value={name}
              onChange={this.changeNameEvent}
              />
            </div>
            <button className="btn-warning" onClick={this.editRoom}>Edit Room</button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(EditRoom);

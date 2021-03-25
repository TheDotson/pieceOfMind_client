import React from 'react';
import { withRouter } from 'react-router-dom';

class EditItem extends React.Component {
  state = {
    name: '',
    location: 0,
    price: '',
    rooms: []
  }

  componentDidMount() {
    this.getItemById();
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


  getItemById = () => {
    const { itemId } = this.props.match.params;
    return fetch(`http://localhost:8000/items/${itemId}`, {   
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`}
      }
        )
    .then(res => res.json())
    .then(res => {
      this.setState({ name: res.name, location: res.location.id, price: res.price })
    })
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  changeLocationEvent = (e) => {
    e.preventDefault();
    this.setState({ location: Number(e.target.value) });
  }

  changePriceEvent = (e) => {
    e.preventDefault();
    this.setState({ price: e.target.value });
  }

  editItem = (e) => {
    e.preventDefault();
    const { name, price, location, image } = this.state
    const { itemId } = this.props.match.params;

    const edited_item = {
      name: name,
      price: price,
      location: location,
      image: image
    }

    fetch(`http://localhost:8000/items/${itemId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(
        edited_item
      )
    })
      .then(res => {
        this.props.history.goBack()
      })
  }

  render() {
    const { name, price, location, rooms } = this.state;
    return (
      <div className="form-wrapper">
      <h1 className="text-center mt-3">Edit Item</h1>
      <form className="col-4 realForm form-style" autoComplete="off">
        <div className="form-group">
          <label className="mt-3" htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" value={name} onChange={this.changeNameEvent} />
        </div>
        <div className="form-group">
        <label htmlFor="price">Price</label>
        <div className="input-group">
          <div class="input-group-prepend">
          <span class="input-group-text">$</span>
          <span class="input-group-text">0.00</span>
          </div>
          <input type="text" className="form-control" id="price" value={price} onChange={this.changePriceEvent} />
        </div>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
            <br/><select class="custom-select custom-select-lg" ovalue={location} onChange={this.changeLocationEvent}>              
              {rooms.map(room => <option key={room.id} value={room.id}>{room.name}</option>)}
            </select>
        </div>
      <button className="btn btn-success submit" onClick={this.editItem}>Save</button>
    </form>
  </div>
    )
  }
}

export default withRouter(EditItem);

import React from 'react';
import { withRouter } from 'react-router-dom';

class NewItem extends React.Component {
    state = {
        name: '',
        location: '',
        price: '',
        image: '',
        rooms: [],
        collections: []
    }

    componentDidMount() {
      this.getAllRooms();
      this.getAllCollections();
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

    getAllCollections = () => {
      return fetch("http://localhost:8000/collections", {   
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`}
      }
        )
      .then(res => res.json())
      .then(res => {
        this.setState({ collections: res.results })
      })
    }
  
  
    createNameEvent = (e) => {
        e.preventDefault();
        this.setState({ name: e.target.value });
    }

    createImageEvent = (e) => {
      e.preventDefault();
      this.setState({ image: e.target.value });
    }
  
    createLocationEvent = (e) => {
      e.preventDefault();
      this.setState({ location: Number(e.target.value) });
    }
  
    createPriceEvent = (e) => {
      e.preventDefault();
      this.setState({ price: e.target.value });
    }
  
    createItem = (e) => {
        e.preventDefault();
        const { name, price, location, image } = this.state

        const newItem = {
          name: name,
          price: price,
          location: location,
          image: image
        }
        fetch("http://localhost:8000/items", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                newItem
            )
        })
        .then(res => res.json())
        .then(res => {
            this.props.history.push('/collections')
        })
    }

    render() {
      const { rooms } = this.state
        return(
            <div className="newItemForm">
              <h2 className="text-center">Create New Item</h2>
              <div className="newFormContainer">
                <form className="col-4 realForm">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Item Name" onChange={this.createNameEvent} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input type="text" className="form-control" id="image" placeholder="Image URL" onChange={this.createImageEvent} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="text" className="form-control" id="price" placeholder="Item Price" onChange={this.createPriceEvent} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <select onChange={this.createLocationEvent}>              
                      {rooms.map(room => <option key={room.id} value={room.id}>{room.name}</option>)}
                    </select>
                  </div>
                  <button className="btn-success" onClick={this.createItem}>Create Item</button>
                </form>
              </div>
            </div>
        )
    }
}

export default withRouter(NewItem);
